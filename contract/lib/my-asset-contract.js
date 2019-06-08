/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

// connect to the election data file
const electionDataPath = path.join(process.cwd(), './lib/data/electionData.json');
const electionDataJson = fs.readFileSync(electionDataPath, 'utf8');
const electionData = JSON.parse(electionDataJson);

const ballotDataPath = path.join(process.cwd(), './lib/data/ballotData.json');
const ballotDataJson = fs.readFileSync(ballotDataPath, 'utf8');
const ballotData = JSON.parse(ballotDataJson);

let util = require('util');

//import our file which contains our constructors and auxiliary function
let Ballot = require('./Ballot.js');
let Election = require('./Election.js');
let Voter = require('./Voter.js');
let VotableItem = require('./VotableItem.js');

class MyAssetContract extends Contract {

  async init(ctx) {
    console.log('instantiate was called!');

    let voters = [];

    //create the voters
    let voter1 = await new Voter('1', '234', 'Horea', 'Porutiu');
    let voter2 = await new Voter('2', '345', 'Duncan', 'Conley');
    let voter3 = await new Voter('3', '456', 'Mark', 'Ashla');

    //add the voters to the world state, the election class checks for registered voters 
    await this.updateMyAsset(ctx, voter1.voterId, voter1);
    await this.updateMyAsset(ctx, voter2.voterId, voter2);
    await this.updateMyAsset(ctx, voter3.voterId, voter3);

    //create the election
    let election = await new Election('123', electionData.electionName,
      electionData.electionCountry, electionData.electionYear, 'now', 'forever');

    voters.push(voter1);
    voters.push(voter2);
    voters.push(voter3);

    //create votableItems for the ballots
    let presVotable = await new VotableItem(ctx, '1', ballotData.presidentialRaceTitle,
      ballotData.presidentialRaceDescription, false);
    let governorVotable = await new VotableItem(ctx, '2', ballotData.governorRaceTitle,
      ballotData.governorRaceDescription, false);
    let mayorVotable = await new VotableItem(ctx, '3', ballotData.mayorRaceTitle,
      ballotData.mayorRaceDescription, false);
    let propVotable = await new VotableItem(ctx, '4', ballotData.propositionTitle,
      ballotData.propositionDescription, true);

    //populate choices array so that the ballots can have all of these choices 
    let choices = [];
    choices.push(presVotable);
    choices.push(governorVotable);
    choices.push(mayorVotable);
    choices.push(propVotable);

    for (let i = 0; i < voters.length; i++) {
      //give each registered voter a ballot
      voters[i].ballot = await new Ballot(ctx, choices, election, voters[i].voterId);
      voters[i].ballotCreated = true;
    }

    console.log('before update'); 

    //update the voters with their ballots before they vote.
    await this.updateMyAsset(ctx, voter1.voterId, voter1);
    await this.updateMyAsset(ctx, voter2.voterId, voter2);
    await this.updateMyAsset(ctx, voter3.voterId, voter3);

    console.log('voters after updating: ');
    console.log(util.inspect(voters));
    console.log(util.inspect(voters[0].ballot.votableItems[0]));

    return voters;

  }

  async myAssetExists(ctx, myAssetId) {
    const buffer = await ctx.stub.getState(myAssetId);
    return (!!buffer && buffer.length > 0);
  }

  async createMyAsset(ctx, myAssetId, value) {

    console.log('myAssetId: ');
    console.log(myAssetId);
    console.log('value: ');
    console.log(value);
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (exists) {
      console.log(`The my asset ${myAssetId} already exists, will update instead`);

    } else {
      const asset = { value };
      const buffer = Buffer.from(JSON.stringify(asset));
  
      console.log(`about to put this assetId ${myAssetId} with the following value: ${value}`);
      await ctx.stub.putState(myAssetId, buffer);
    }
  }

  async readMyAsset(ctx, myAssetId) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }
    const buffer = await ctx.stub.getState(myAssetId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  async updateMyAsset(ctx, myAssetId, newValue) {
    console.log('updateAsset');

    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }

    console.log('after exists');
    const asset = { value: newValue };
    const buffer = Buffer.from(JSON.stringify(asset));

    console.log('about to get to putState');
    await ctx.stub.putState(myAssetId, buffer);
  }

  async deleteMyAsset(ctx, myAssetId) {
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }
    await ctx.stub.deleteState(myAssetId);
  }

}

module.exports = MyAssetContract;
