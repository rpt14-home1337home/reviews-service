const faker = require('faker');
const fs = require('fs');
const promise = require('bluebird');
const output = __dirname + '/mysql_items_seed.sql';
const fsAsync = promise.promisifyAll(fs);
const exec = require('child_process').exec;

const MAX_REVS = 50000000;
const MAX_ITEMS = 10000000;

let randomIntFromOne = max => {
  return Math.ceil(Math.random() * max);
};
fsAsync.writeFileAsync(output, 'USE bnb; TRUNCATE item_reviews;\n')
  .then(() => {
    let items = {};
    let reviews = {}
    // create 50,000,000 reviews
    const setupQuery = 'INSERT INTO item_reviews (item_id, review_id) VALUES '
    let query = '';
    let interim = '';
    for (let i = 1; i <= MAX_REVS; i++) {
      let item = {
        item_id: randomIntFromOne(MAX_ITEMS),
        review_id: i
      };

      interim += `(${item.item_id},${item.review_id}),`;
      if(i % 250 === 0) {
        query += setupQuery + interim.substr(0, interim.length - 1) + ';\n';
        interim = '';
      }
      if(i % 100000 === 0) {
        fs.appendFileSync(output, query);
        interim = '';
        query = '';
        console.log(`Item ${i}/${MAX_REVS} generated`);
      }
    }

  })
  .then(() => {
    console.log('Begin mySQL insertion');
    exec(`mysql -u root < ${__dirname}/mysql_items_seed.sql`, (stdout, stderr) => {
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