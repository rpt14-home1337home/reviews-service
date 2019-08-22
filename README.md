# AirBNB Reviews

## Intent

To mimic the review microservice as seen at AirBNB.

---
## Technologies

- node.js
- express.js
- MySQL or Cassandra

---
## Installation

1. Fork and clone repo
2. Run `npm install` to load dependencies
3. Run `npm run build` to build and watch jsx files with webpack
4. Run `npm start` to start server with nodemon

---
## Useage
### Routes
**READ**

- /reviews - GETs all reviews
- /reviews/:id - GET review by review ID number
- /item/:id/reviews - GET all reviews for a given item ID number

**CREATE**

- /reviews/single - POST a single review, expects JSON object like:
```json
{
  name: string
  avatar: string(url)
  referenceItem: number,
  content: string
}
```
- /reviews/batch - POST a batch of reviews, expects an array of JSON object like:
```json
[
  {
    name: string
    avatar: string(url)
    referenceItem: number,
    content: string
  },
  {
    name: string
    avatar: string(url)
    referenceItem: number,
    content: string
  }
]
```

**DELETE**

- /reviews/:id - DELETE a review with the provided ID number

**UPDATE**

- /reviews/:id - modify existing review with any number of valid key/value pairs within a JSON object

### Database
**Initialization**

1. Load the appropriate *your-db*_schema.sql file into your database
2. Run `node database/*your-db*_seed.js` to generate 50 million records and import them to your database