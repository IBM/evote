/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

//import Hyperledger Fabric 1.4 SDK
const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

// connect to the election data file
const electionDataPath = path.join(process.cwd(), './lib/data/electionData.json');
const electionDataJson = fs.readFileSync(electionDataPath, 'utf8');
const electionData = JSON.parse(electionDataJson);

// connect to the ballot data file
const ballotDataPath = path.join(process.cwd(), './lib/data/ballotData.json');
const ballotDataJson = fs.readFileSync(ballotDataPath, 'utf8');
const ballotData = JSON.parse(ballotDataJson);

// const firstChoice = 0;
// const secondChoice = 1;

// let util = require('util');

//import our file which contains our constructors and auxiliary function
let Ballot = require('./Ballot.js');
let Election = require('./Election.js');
let Voter = require('./Voter.js');
let VotableItem = require('./VotableItem.js');
let HelperFunctions = require('./HelperFunctions.js');
let helperFunctions = new HelperFunctions();


class MyAssetContract extends Contract {

  async init(ctx) {

    console.log('instantiate was called!');

    let voters = [];
    let votableItems = [];
    let elections = [];

    //create FNRJ
    let voter1 = await new Voter('V1', '234', 'Horea', 'Porutiu');
    let voter2 = await new Voter('V2', '345', 'Duncan', 'Conley');
    let voter3 = await new Voter('V3', '456', 'Mark', 'Ashla');
    let voter4 = await new Voter('V4', '567', 'Danny', 'Powell');

    //add the voters to the world state, the election class checks for registered voters 
    await helperFunctions.updateMyAsset(ctx, voter1.voterId, voter1);
    await helperFunctions.updateMyAsset(ctx, voter2.voterId, voter2);
    await helperFunctions.updateMyAsset(ctx, voter3.voterId, voter3);
    await helperFunctions.updateMyAsset(ctx, voter4.voterId, voter4);

    //election day is always on a tuesday, and lasts a full day
    let electionStartDate = await new Date(2020, 11, 3);
    let electionEndDate = await new Date(2020, 11, 4);

    //create the election
    let election = await new Election(electionData.electionName, electionData.electionCountry,
      electionData.electionYear, electionStartDate, electionEndDate);

    //update voters array
    voters.push(voter1);
    voters.push(voter2);
    voters.push(voter3);
    voters.push(voter4);

    //update elections array
    elections.push(election);
    console.log(`***************************************************
      election.electionId: ${election.electionId} and election: ${election}`);
    await helperFunctions.updateMyAsset(ctx, election.electionId, election);

    //create votableItems for the ballots
    let presVotable = await new VotableItem(ctx, 'VI1', ballotData.presidentialRaceTitle,
      ballotData.presidentialRaceDescription, false);
    let governorVotable = await new VotableItem(ctx, 'VI2', ballotData.governorRaceTitle,
      ballotData.governorRaceDescription, false);
    let mayorVotable = await new VotableItem(ctx, 'VI3', ballotData.mayorRaceTitle,
      ballotData.mayorRaceDescription, false);
    let propVotable = await new VotableItem(ctx, 'VI4', ballotData.propositionTitle,
      ballotData.propositionDescription, true);

    //populate choices array so that the ballots can have all of these choices 
    votableItems.push(presVotable);
    votableItems.push(governorVotable);
    votableItems.push(mayorVotable);
    votableItems.push(propVotable);

    //save choices in world state
    for (let i = 0; i < votableItems.length; i++) {

      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& votable items &&&&&&&&&&&&&&&&&&');
      console.log('votableItems[i]');
      console.log(votableItems[i]);
      await helperFunctions.updateMyAsset(ctx, votableItems[i].votableId, votableItems[i]);
    }

    //generate ballots for all voters
    for (let i = 0; i < voters.length; i++) {

      if (!voters[i].ballot) {

        //give each registered voter a ballot
        voters[i].ballot = await new Ballot(ctx, votableItems, election, voters[i].voterId);
        voters[i].ballotCreated = true;

        //update state with ballots
        await helperFunctions.updateMyAsset(ctx, voters[i].ballot.ballotId, voters[i].ballot);

      } else {
        console.log('these voters already have ballots');
        break;
      }

    }

    //update the voters with their ballots before they vote.
    await helperFunctions.updateMyAsset(ctx, voter1.voterId, voter1);
    await helperFunctions.updateMyAsset(ctx, voter2.voterId, voter2);
    await helperFunctions.updateMyAsset(ctx, voter3.voterId, voter3);
    await helperFunctions.updateMyAsset(ctx, voter4.voterId, voter4);

    return voters;

  }
}
module.exports = MyAssetContract;
