require('newrelic');
const cluster = require('cluster');

const express = require('express');

const bodyParser = require('body-parser');
const routes = require('./routes/api.js');
const path = require('path');
const morgan = require('morgan');

if(cluster.isMaster) {
  console.log(`Master ${process.pid} running`);
  const cpuCount = require('os').cpus().length;

  for(let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} online`);
  });

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {
  // create express server
  const app = express();

  // initialize middleware
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/:id', express.static(path.join(__dirname, '../public')));

  app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message})
  });
  app.use(morgan('tiny'));

  //initialize routes mw
  app.use(routes);

  // listen
  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log(`Worker ${cluster.worker.id} running on port ${port}`);
  });

}


//LOAD DATA LOCAL INFILE 'MOCK_DATA.csv' INTO TABLE bnb.reviews;

// LOAD DATA LOCAL INFILE 'MOCK_DATA.csv'
// INTO TABLE reviews
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// (id,name,avatar,numDaysAgo,content);

// allows you to keep track of days by using an auto-incrementer on event;
// SET GLOBAL event_scheduler = ON;

//edit event
// alter event updateReviewAge on schedule every 2 minute;