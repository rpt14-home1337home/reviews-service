const express = require('express');
const router = express.Router();
const mysql = require('mysql');  // mysql -u root -p < database/schema.sql
const db = require('../../database/index.js');

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
});


// GET ALL REVIEWS
router.get('/reviews', (req, res, next) => {
  db.getAllReviews()
    .then(data => {
      res.end(JSON.stringify(data));
    })
});

// Get a single review by ID
router.get('/reviews/:id', (req, res, next) => {
  console.log('router.get called')
  let sql = `SELECT * FROM reviews WHERE id = ${req.params.id};`;
  connection.query(sql, (err, data)=> {
    if (err) {
      throw new Error(err);
    } else {
      res.send(data);
    }
  });
});

// Get reviews by Item ID
router.get('/item/:id/reviews', (req, res, next) => {
  db.getAllByItemID(req.params.id).then(data => {
      res.end(JSON.stringify(data));
    });
});

// Post a new review
router.post('/reviews/single', (req, res, next) => {
  db.addReview(req.body).then(() => {
      res.end('Review created');
    });
});

// Delete Review by ID
router.delete('/reviews/:id', (req, res, next) => {
  console.log('router.get called')
  let sql = `DELETE FROM reviews WHERE id=${req.params.id}`;
  connection.query(sql, (err, data)=> {
    if (err) {
      throw new Error(err);
    } else {
      res.send(data);
    }
  });
});

// Update review via ID
router.put('/reviews/:id', (req, res, next) => {
  console.log('router.get called')
  let sql = 'UPDATE reviews SET ';
  Object.keys(req.body).forEach((key, index) => {
    sql += index > 0 ? ',' : '';
    let value = typeof req.body[key] === 'number' ? req.body[key] : `"${req.body[key]}"`;
    sql += `${key}=${value}`;
  });
  sql += ` WHERE id=${req.params.id};`;

  connection.query(sql, (err, data)=> {
    if (err) {
      throw new Error(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

