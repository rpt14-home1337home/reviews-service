CREATE TABLE bnb.reviews (
  id int,
  name text,
  avatar text,
  updatedAt text,
  createdAt text,
  referenceItem int,
  content text,
  PRIMARY KEY(id, referenceItem, name)
);