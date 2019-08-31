const uuid = require('uuid/v4');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'bnb'
});

client.connect(err => {
  if(err) throw new Error(err);
});

const getAllReviews = () => {
  const query = 'SELECT * FROM bnb.reviews;';
  return client.execute(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      throw new Error(err);
    });
}

const getAllByItemID = itemID => {
  const query =  `SELECT * FROM bnb.reviews WHERE referenceitem = ${itemID};`;
  return client.execute(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      throw new Error(err);
    });
}

const addReview = reqBody => {
  const { referenceItem, name, avatar, content } = reqBody;
  const query = `
    INSERT INTO bnb.reviews (id, name, referenceitem, avatar, content, createdat, updatedat)
      VALUES (${uuid()}, ${name}, ${referenceItem}, ${avatar}, ${content}, ${Date.now()}, ${Date.now()})
  `;

}

module.exports = {
  getAllByItemID: getAllByItemID,
  getAllReviews: getAllReviews
}