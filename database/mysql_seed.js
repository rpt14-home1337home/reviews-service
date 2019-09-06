const faker = require('faker');
const fs = require('fs');
const promise = require('bluebird');
const output = __dirname + '/mysql_seed.sql';
const fsAsync = promise.promisifyAll(fs);
const exec = require('child_process').exec;

const MAX_REVS = 50000000;
const MAX_ITEMS = 10000000;

let randomIntFromOne = max => {
  return Math.ceil(Math.random() * max);
};

let createRandomDate = () => {
  let year = 2019 - randomIntFromOne(2);
  let month = randomIntFromOne(12);
  let day = randomIntFromOne(28);
  let hour = randomIntFromOne(24) - 1;
  let min = randomIntFromOne(60) - 1;
  let sec = randomIntFromOne(60) - 1;

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

fsAsync.writeFileAsync(output, 'USE bnb; TRUNCATE reviews;\n')
  .then(() => {
    // create 50,000,000 reviews
    const setupQuery = 'INSERT INTO reviews (id, name, content, referenceItem, avatar, createdAt, updatedAt) VALUES '
    let query = '';
    let interim = '';
    for (let i = 1; i <= MAX_REVS; i++) {
      let createdAt = createRandomDate();
      let review = {
        id: i,
        name: `"${faker.name.firstName()} ${faker.name.lastName()}"`,
        content: `"${faker.lorem.paragraphs(randomIntFromOne(3))}"`,
        referenceItem: randomIntFromOne(MAX_ITEMS),
        avatar: `"${faker.image.people(50, 50)}"`,
        createdAt: `"${createdAt}"`,
        updatedAt: `"${createdAt}"`
      };

      interim += `(${Object.values(review).join(',')}),`;
      if(i % 250 === 0) {
        query += setupQuery + interim.substr(0, interim.length - 1) + ';\n';
        interim = '';
      }
      if(i % 10000 === 0) {
        fs.appendFileSync(output, query);
        interim = '';
        query = '';
        console.log(`Review ${i}/${MAX_REVS} generated`);
      }
    }

  })
  .then(() => {
    console.log('Begin mySQL insertion');
    exec(`mysql -u root < ${__dirname}/mysql_seed.sql`, (stdout, stderr) => {
      if (stderr) {
        console.log(stderr);
      } else {
        console.log(stdout);
      }
    });
  })
  .catch(err => {
    console.log(err);
  });