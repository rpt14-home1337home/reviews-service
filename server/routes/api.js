const express = require('express');
const router = express.Router();
const db = require('../../database/index.js');

const errorHandler = err => {
  throw new Error(err);
}

// GET ALL REVIEWS
router.get('/reviews', (req, res, next) => {
  db.getAllReviews()
    .then(data => {
      res.end(JSON.stringify(data));
    })
    .catch(errorHandler);
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
  db.getAllByItemID(req.params.id)
    .then(data => {
      res.end(JSON.stringify(data));
    })
    .catch(errorHandler);
});

// Post a new review
router.post('/reviews/single', (req, res, next) => {
  db.addReview(req.body)
    .then(data => {
      res.end(JSON.stringify(data));
    })
    .catch(errorHandler);
});

// Delete Review by ID
router.delete('/item/:itemNum/reviews/:id', (req, res, next) => {
  db.deleteReview(req.params.itemNum, req.params.id)
    .then(data => {
    res.end(JSON.stringify(data));
  })
  .catch(errorHandler);
});

// Update review via ID
router.put('/item/:itemNum/reviews/:id', (req, res, next) => {
  db.updateReview(req.params.itemNum, req.params.id, req.body)
    .then(data => {
    res.end(JSON.stringify(data));
  })
  .catch(errorHandler);
});

module.exports = router;

