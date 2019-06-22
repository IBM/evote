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

//get all assets in world state
app.get('/queryAll', async (req, res) => {

  let networkObj = await network.connectToNetwork();
  let response = await network.invoke(networkObj, true, 'queryAll', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);

});

//vote for some candidates. This will increase the vote count for the votable objects
app.post('/castBallot', async (req, res) => {

  req.body = JSON.stringify(req.body);
  let args = [req.body];
  let networkObj = await network.connectToNetwork();
  let response = await network.invoke(networkObj, false, 'castVote', args);
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);

});

//query for certain objects within the world state
app.post('/queryWithQueryString', async (req, res) => {

  let networkObj = await network.connectToNetwork();
  let response = await network.invoke(networkObj, true, 'queryByObjectType', req.body.selected);
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);

});

//get voter info, create voter object, and update state with their voterId
app.post('/registerVoter', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  //first create the identity for the voter and add to wallet
  let response = await network.registerVoter(req.body.voterId, req.body.registrarId, req.body.firstName, req.body.lastName);
  if (response.error) {
    res.send(response.error);
  } else {
    req.body = JSON.stringify(req.body);
    let args = [req.body];
    //connect to network and update the state with voterId  
    let networkObj = await network.connectToNetwork();
    if (networkObj.error) {
      res.send(networkObj.error);
    }

    let invokeResponse = await network.invoke(networkObj, false, 'createVoter', args);
    if (invokeResponse.error) {
      res.send(invokeResponse.error);
    } else {
      console.log('after network.invoke ');
      // let parsedResponse = await JSON.parse(response);
      res.send(invokeResponse);
    }

  }


});

//used as a way to login the voter to the app and make sure they haven't voted before 
app.post('/validateVoter', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

});

app.post('/queryByKey', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  let networkObj = await network.connectToNetwork();
  console.log('after network OBj');
  let response = await network.invoke(networkObj, true, 'readMyAsset', req.body.key);
  response = JSON.parse(response);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
});


app.listen(process.env.PORT || 8081);