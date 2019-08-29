CREATE TABLE bnb.reviews (
  id int,
  name text,
  avatar text,
  updatedAt text,
  createdAt text,
  referenceItem int,
  content text,
  PRIMARY KEY(referenceItem, id, name)
);