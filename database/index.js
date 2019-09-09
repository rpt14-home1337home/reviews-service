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
  const query = 'SELECT id, dateOf(id) AS createdat, name, referenceitem, avatar, content, dateOf(updatedat) AS updatedat FROM bnb.reviews;';
  return client.execute(query)
    .then(data => {
      return data.rows;
    });
}

const getAllByItemID = itemID => {
  const query =  `SELECT id, dateOf(id) AS createdat, name, referenceitem, avatar, content, dateOf(updatedat) AS updatedat FROM bnb.reviews WHERE referenceitem = ${itemID};`;
  return client.execute(query)
    .then(data => {
      return data.rows;
    });
}

const addReview = reqBody => {
  const { referenceItem, name, avatar, content } = reqBody;
  const initialUUID = uuid();
  const query = `
    INSERT INTO bnb.reviews (id, name, referenceitem, avatar, content, updatedat)
      VALUES (${initialUUID}, '${name}', ${referenceItem}, '${avatar}', '${content}', ${initialUUID});
  `;
  return client.execute(query)
    .then(() => {
      return 'Insertion successful';
    });
}

const deleteReview = (refItem, id) => {
  const query = `DELETE FROM bnb.reviews WHERE referenceitem=${refItem} AND id=${id};`;
  return client.execute(query)
    .then(() => {
      return `Review ${id} deleted`;
    });
}

const updateReview = (refItem, id, body) => {
  body.updatedat = uuid();
  let query = `UPDATE bnb.reviews SET `
  Object.keys(body).forEach((key, index) => {
    query += index > 0 ? ',' : '';
    let value = key === 'updatedAt' ? body[key] : `'${body[key]}'`;
    if(key !== 'referenceitem' && key !== 'id') {
      query += `${key}=${value}`;
    }
  });
  console.log(query);
  query += ` WHERE referenceitem=${refItem} AND id=${id};`;
  let regex = /'[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}'/;
  query = query.replace(regex, body.updatedat);

  return client.execute(query)
    .then(() => {
      return `Review ${id} updated`;
    });
}

module.exports = {
  getAllByItemID: getAllByItemID,
  getAllReviews: getAllReviews,
  addReview: addReview,
  deleteReview: deleteReview,
  updateReview: updateReview
}