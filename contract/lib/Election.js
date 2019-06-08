'use strict';

class Election {

  /**
   *
   * validateElection
   *
   * check for valid election, cross check with government. Don't want duplicate
   * elections.
   *  
   * @param electionId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateElection(electionId) {

    //registrarId error checking here, i.e. check if valid drivers License, or state ID
    if (electionId) {
      return true;
    } else {
      return false;
    }
  }
  /**
   *
   * Election
   *
   * Constructor for an Election object. Specifies start and end date.
   *  
   * @param items - an array of choices 
   * @param election - what election you are making ballots for 
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */
  constructor(electionId, name, country, year, startDate, endDate) {

    if (this.validateElection(electionId)) {

      //create the election object
      this.electionId = electionId;
      this.name = name;
      this.country = country;
      this.year = year;
      this.startDate = startDate;
      this.endDate = endDate;
      return this;

    } else {
      throw new Error('not a valid election!');
    }

  }

}
module.exports = Election;