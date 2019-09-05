const uuid = require('uuid/v1');

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
  const initialUUID = uuid();
  const query = `
    INSERT INTO bnb.reviews (id, name, referenceitem, avatar, content, updatedat)
      VALUES (${initialUUID}, '${name}', ${referenceItem}, '${avatar}', '${content}', ${initialUUID})
  `;
  return client.execute(query)
    .then(() => {
      return 'Insertion successful';
    })
    .catch(err => {
      throw new Error(err);
    });
}

const deleteReview = (refItem, id) => {
  const query = `DELETE FROM bnb.reviews WHERE referenceitem=${refItem} AND id=${id};`;
  return client.execute(query)
    .then(() => {
      return `Review ${id} deleted`;
    })
    .catch(err => {
      throw new Error(err);
    });
}

module.exports = {
  getAllByItemID: getAllByItemID,
  getAllReviews: getAllReviews,
  addReview: addReview,
  deleteReview: deleteReview
}