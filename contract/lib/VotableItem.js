/* eslint-disable indent */
'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

// connect to the election data file
console.log('about to hit errro');
const ballotDataPath = path.join(process.cwd(), './lib/data/ballotData.json');
const ballotDataJson = fs.readFileSync(ballotDataPath, 'utf8');
const ballotData = JSON.parse(ballotDataJson);

class VotableItem extends Contract {

  /**
   *
   * Choice
   *
   * Constructor for a choice object. These will eventually be placed on the 
   * ballot. 
   *  
   * @param votableId - the Id of the votableItem
   * @param title - the title of the votableItem
   * @param description - the description of the votableItem
   * @param voterId - the unique Id which corresponds to a registered voter
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */
  constructor(ctx, votableId, votableTitle, description, isProp) {

    super();

    this.votableId = votableId;
    this.votableTitle = votableTitle;
    this.description = description;
    this.isProp = isProp;
    this.choices = this.generateChoices(ctx, votableTitle);
    return this;

  }

  /**
   *
   * generateChoices
   *
   * check for valid election, cross check with government. Don't want duplicate
   * elections.
   *  
   * @param voterId - the unique Id for a registered voter 
   * @returns - an object of all the votable choices on the ballot
   */
  generateChoices(ctx, votableTitle) {

    console.log('votableTitle: ');
    console.log(votableTitle);

    switch (votableTitle) {
      case 'Presidential Race': {
        console.log('inside pres race');
        let presChoices = [];
        let democratPres = {
          brief: ballotData.fedDemocratBrief,
          description: ballotData.fedDemocratDescription,
          count: 0
        };

        let republicanPres = {
          brief: ballotData.fedRepublicanBrief,
          description: ballotData.fedRepublicanDescription,
          count: 0
        };
        presChoices.push(democratPres);
        presChoices.push(republicanPres);
        return presChoices;
      }


      case 'Governor Race': {
        let govChoices = [];
        let democratGov = {
          brief: ballotData.governorDemocratBrief,
          description: ballotData.governorDemocratDescription,
          count: 0
        };

        let republicanGov = {
          brief: ballotData.governorRepublicanBrief,
          description: ballotData.governorRepublicanDescription,
          count: 0
        };
        govChoices.push(democratGov);
        govChoices.push(republicanGov);
        return govChoices;
      }

      case 'Mayor Race': {
        let mayorChoices = [];
        let democratMayor = {
          brief: ballotData.mayorDemocratBrief,
          description: ballotData.mayorDemocratDescription,
          count: 0
        };

        let republicanMayor = {
          brief: ballotData.mayorRepublicanBrief,
          description: ballotData.mayorRepublicanDescription,
          count: 0
        };
        mayorChoices.push(democratMayor);
        mayorChoices.push(republicanMayor);
        return mayorChoices;
      }

      case 'Proposition 100': {
        let propChoices = [];
        let propYes = {
          brief: ballotData.propYesBrief,
          description: ballotData.propYesDescription,
          count: 0
        };

        let propNo = {
          brief: ballotData.propNoBrief,
          description: ballotData.propNoDescription,
          count: 0
        };
        propChoices.push(propYes);
        propChoices.push(propNo);
        return propChoices;
      }
    }
    return;
  }
}
module.exports = VotableItem;