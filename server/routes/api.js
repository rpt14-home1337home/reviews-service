const express = require('express');
const router = express.Router();
const mysql = require('mysql');  // mysql -u root -p < database/schema.sql

// CONNECT TO MYSQL WITH CREDENTIALS
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database : 'bnb'
  });

// CHECK CONNECTION
connection.connect((err)=> {
  if (err) {
    throw new Error(err);
  } else {
    console.log('mysqlConnecttion successful')
  }
})


// GET ALL REVIEWS
router.get('/reviews', (req, res, next) => {
  console.log('router.get called')
  let sql = 'SELECT * FROM reviews;';
  connection.query(sql, (err, data)=> {
    if (err) {
      throw new Error(err);
    } else {
      res.send(data);
    }
  })
})

// Post a new review

router.post('/reviews/single', (req, res, next) => {
  console.log(req.body);
  let sql = `INSERT INTO reviews (name, avatar, numDaysAgo, content)
    VALUES ("${req.body.name}", "${req.body.avatar}", ${req.body.numDaysAgo}, "${req.body.content}")`;

  connection.query(sql, (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('Single insertion successful');
      res.end('Single insertion successful');
    }
  })
});

router.post('/reviews/batch', (req, res, next) => {
  let sql = `INSERT INTO reviews (name, avatar, numDaysAgo, content)
    VALUES `;

  if(!Array.isArray(req.body)) {
    throw new Error('Data is not an array');
  } else {
    req.body.forEach((review, index) => {
      sql += index > 0 ? ',' : '';
      sql += `("${review.name}", "${review.avatar}", ${review.numDaysAgo}, "${review.content}")`;
    });
  }

  connection.query(sql, (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('Batch insertion successful');
      res.end('Batch insertion successful');
    }
  })
});

module.exports = router;

