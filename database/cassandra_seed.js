const faker = require('faker');
const fs = require('fs');
const promise = require('bluebird');
const output = __dirname + '/cassandra_seed.cql';
const fsAsync = promise.promisifyAll(fs);
const exec = require('child_process').exec;
// const config = require('../config');

const MAX_REVS = 50000000;
const MAX_ITEMS = 10000000;

let randomIntFromOne = max => {
  return Math.ceil(Math.random() * max);
};

let createRandomDate = () => {
  let date = {
    year: 2019 - randomIntFromOne(2),
    month: randomIntFromOne(12),
    day: randomIntFromOne(28),
    hour: randomIntFromOne(24) - 1,
    min: randomIntFromOne(60) - 1,
    sec: randomIntFromOne(60) - 1
  }
  for(prop in date) {
    if(date[prop] < 10) {
      date[prop] = '0' + date[prop];
    }
    date[prop] += '';
  }


  return `${date.year}-${date.month}-${date.day} ${date.hour}:${date.min}:${date.sec}`
}

fsAsync.writeFileAsync(output, 'USE bnb; TRUNCATE bnb.reviews;\n')
  .then(() => {
    console.log('Data gen started @:', Date.now());
    // create 50,000,000 reviews
    let query = '';
    for (let i = 1; i <= MAX_REVS; i++) {
      let createdAt = createRandomDate();
      let review = {
        id: i,
        name: `$$${faker.name.firstName()} ${faker.name.lastName()}$$`,
        content: `$$${faker.lorem.paragraphs(randomIntFromOne(3))}$$`,
        referenceItem: randomIntFromOne(MAX_ITEMS),
        avatar: `$$${faker.image.people(50, 50)}$$`,
        createdAt: `$$${createdAt}$$`,
        updatedAt: `$$${createdAt}$$`
      };

      query += `INSERT INTO bnb.reviews (${Object.keys(review).join(',')}) VALUES (${Object.values(review).join(',')});\n`;
      if(i % 100000 === 0) {
        fs.appendFileSync(output, query);
        query = '';
        console.log(`Review ${i}/${MAX_REVS} generated`);
      }
    }

  })
  .then(() => {
    console.log('Data gen finished @:', Date.now());
    console.log('Begin cassandra insertion');
    exec(`cqlsh < ${__dirname}/cassandra_seed.cql`, (stdout, stderr) => {
      if (stderr) {
        console.log(stderr);
      } else {
        console.log('Insertion finished @:', Date.now());
      }
    });
  })
  .catch(err => {
    console.log(err);
  });