CREATE TABLE bnb.reviews (
  id timeuuid,
  name text,
  avatar text,
  updatedAt timeuuid,
  referenceItem int,
  content text,
  PRIMARY KEY(referenceItem, id, name)
);