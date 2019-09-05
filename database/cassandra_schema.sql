CREATE TABLE bnb.reviews (
  id uuid,
  name text,
  avatar text,
  createdAt text,
  updatedAt text,
  referenceItem int,
  content text,
  PRIMARY KEY(referenceItem, id, name)
);