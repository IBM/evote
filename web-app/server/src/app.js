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

app.get('/queryByObjectType', (req, res) => {
  console.log('query by object');
  network.queryByObjectType('ballot')
    .then((response) => {
      let carsRecord = JSON.parse(response);
      res.send(carsRecord);
    });
});

app.get('/queryAllCars', (req, res) => {
  console.log('queryALL CARS WOOO');
  network.queryAllCars()
    .then((response) => {
      let carsRecord = JSON.parse(response);
      res.send(carsRecord);
    });
});

app.post('/createCar', (req, res) => {
  network.queryAllCars()
    .then((response) => {
      let carsRecord = JSON.parse(JSON.parse(response));
      let numCars = carsRecord.length;
      let newKey = 'CAR' + numCars;
      network.createCar(newKey, req.body.make, req.body.model, req.body.color, req.body.owner)
        .then((response) => {
          res.send(response);
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
  network.queryWithQueryString(req.body.selected)
    .then((response) => {
      res.send(response);
    });
});

app.listen(process.env.PORT || 8081);