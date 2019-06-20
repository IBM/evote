/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const { Contract } = require('fabric-contract-api');

const firstChoice = 0;
const secondChoice = 1;

let util = require('util');

class HelperFunctions {

  /**
   *
   * updateMyAsset
   *
   * Updates the world state.  
   *  
   * @param myAssetId - the key of the asset to update
   * @param newValue - the value to store at a certain key 
   * @returns - nothing - but updates the world state
   */
  async updateMyAsset(ctx, myAssetId, newValue) {

    const buffer = Buffer.from(JSON.stringify(newValue));

    console.log(`putState in updateMyAsset with key ${myAssetId} 
      and value ${buffer}`);
    await ctx.stub.putState(myAssetId, buffer);

  }


  /**
   *
   * deleteMyAsset
   *
   * Deletes a key-value pair from the world state, based on the key given.
   *  
   * @param myAssetId - the key of the asset to delete
   * @returns - nothing - but deletes the value in the world state
   */
  async deleteMyAsset(ctx, myAssetId) {

    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }

    await ctx.stub.deleteState(myAssetId);

  }

  /**
   *
   * readMyAsset
   *
   * Reads a key-value pair from the world state, based on the key given.
   *  
   * @param myAssetId - the key of the asset to read
   * @returns - nothing - but reads the value in the world state
   */
  async readMyAsset(ctx, myAssetId) {

    const exists = await this.myAssetExists(ctx, myAssetId);

    if (!exists) {
      throw new Error(`The my asset ${myAssetId} does not exist`);
    }

    const buffer = await ctx.stub.getState(myAssetId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  /**
   *
   * createMyAsset
   *
   * Creates a key-value pair from the world state, based on the key given. 
   * Checks if the asset exists first, and if so, throws an error. 
   *  
   * @param myAssetId - the key of the asset to read
   * @returns - nothing - but creates the value in the world state
   */
  async createMyAsset(ctx, myAssetId, value) {


    const exists = await this.myAssetExists(ctx, myAssetId);

    if (exists) {
      console.log(`The my asset ${myAssetId} already exists, will update instead`);
      throw new Error(`The my asset ${myAssetId} already exists`);

    } else {

      const asset = { value };
      const buffer = Buffer.from(JSON.stringify(asset));

      console.log(`about to put this assetId ${myAssetId} with the following value: ${value}`);
      await ctx.stub.putState(myAssetId, buffer);

    }

  }

  /**
   *
   * myAssetExists
   *
   * Checks to see if a key exists in the world state. 
   * @param myAssetId - the key of the asset to read
   * @returns boolean indicating if the asset exists or not. 
   */
  async myAssetExists(ctx, myAssetId) {

    const buffer = await ctx.stub.getState(myAssetId);
    return (!!buffer && buffer.length > 0);

  }

  /**
   *
   * sort
   *
   * Checks to see if a key exists in the world state. 
   * @param dictToSort - the dictionary of values to sort on the ballot
   * @returns an array which has the winning briefs of the ballot. 
   */
  async sort(dictToSort) {

    let winningChoices = [];

    for (let i = 0; i < dictToSort.length; i++) {
      console.log('inside for loopp');
      if (dictToSort[i].choices[firstChoice].count > dictToSort[i].choices[secondChoice].count) {
        console.log('in if');
        winningChoices.push(dictToSort[i].choices[firstChoice].brief);
      } else {
        console.log('in else');
        winningChoices.push(dictToSort[i].choices[secondChoice].brief);
      }
    }
    return winningChoices;

  }

  /**
   *
   * sort
   *
   * Checks to see if a key exists in the world state. 
   * @param electionId - the electionId of the election we want to vote in
   * @param voterId - the voterId of the voter that wants to vote
   * @returns an array which has the winning briefs of the ballot. 
   */
  async castVote(ctx, electionId, voterId) {
    //check to make sure the election exists
    let electionExists = await this.myAssetExists(ctx, electionId);
    let voterExists = await this.myAssetExists(ctx, voterId);

    if (electionExists && voterExists) {

      console.log('inside exists...');

      //make sure we have an election
      let electionAsBytes = await ctx.stub.getState(electionId);
      let election = await JSON.parse(electionAsBytes);
      let voterAsBytes = await ctx.stub.getState(voterId);
      let voter = await JSON.parse(voterAsBytes);

      if (!voter.ballot) {
        throw new Error('this voter does not have a ballot! ');
      }

      if (voter.ballotCast) {
        throw new Error('this voter has already cast this ballot!');
      }

      console.log(`voter ${voter}, and voters ballot ${voter.ballot}`);

      //check the date of the election, to make sure the election is still open
      let currentTime = await new Date(2020, 11, 3);

      console.log('election: ');
      console.log(election);

      //parse date objects
      let parsedCurrentTime = await Date.parse(currentTime);
      let electionStart = await Date.parse(election.startDate);
      let electionEnd = await Date.parse(election.endDate);

      console.log(`parsedCurTime ${parsedCurrentTime}, electionStart: ${electionStart},
        and electionEnd: ${electionEnd}`);


      if (parsedCurrentTime >= electionStart && parsedCurrentTime < electionEnd) {

        for (let i = 0; i < voter.ballot.votableItems.length; i++) {
          console.log('util.inspect');
          console.log(util.inspect(voter.ballot.votableItems[i].choices[firstChoice]));
          await voter.ballot.votableItems[i].choices[firstChoice].count++;
        }

        let results = await this.sort(voter.ballot.votableItems);

        for (let i = 0; i < results; i++) {
          console.log(`winning results ${results[i]}`);
        }
        return results;

      } else {
        throw new Error('the election is not open now!');
      }

    } else {
      throw new Error('the election or the voter does not exist!');
    }
  }
}
module.exports = HelperFunctions;

