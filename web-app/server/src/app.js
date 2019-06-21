'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/queryAll', (req, res) => {
  console.log('queryALL CARS ');
  network.connectToNetwork()
    .then((networkObj) => {
      network.invoke(networkObj, true, 'queryAll', '')
        .then((response) => {
          let carsRecord = JSON.parse(response);
          res.send(carsRecord);
        });
    });
});

app.post('/castBallot', (req, res) => {

  console.log('req.body: ');
  console.log(req.body);
  req.body = JSON.stringify(req.body);
  let args = [req.body];
  network.connectToNetwork()
    .then((networkObj) => {
      network.invoke(networkObj, false, 'castVote', args)
        .then((response) => {
          let carsRecord = JSON.parse(response);
          res.send(carsRecord);
        });
    });
});

app.post('/changeCarOwner', (req, res) => {
  network.changeCarOwner(req.body.key, req.body.newOwner)
    .then((response) => {
      res.send(response);
    });
});

app.post('/queryWithQueryString', (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  network.connectToNetwork()
    .then((networkObj) => {
      network.invoke(networkObj, true, 'queryByObjectType', req.body.selected)
        .then((response) => {
          let carsRecord = JSON.parse(response);
          res.send(carsRecord);
        });
    });
});

app.post('/registerVoter', (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  network.registerVoter(req.body.voterId)
    .then((response) => {
      let voter = JSON.parse(response);
      res.send(voter);
    });
});

app.listen(process.env.PORT || 8081);