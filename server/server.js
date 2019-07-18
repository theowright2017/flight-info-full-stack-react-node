const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());
app.use(cors());
MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('flightInfo');
  const flightCollection = db.collection('flights');
  const flightRouter = createRouter(flightCollection);
  app.use('/api/flights', flightRouter);
})
.catch(console.error);

app.listen(3000, function() {
  console.log(`Listening on port ${this.address().port}`);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});
// app.get
// res.json({message: 'Hello World'});
// //this returns json api format
