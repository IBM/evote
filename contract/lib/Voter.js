'use strict';

class Voter {

  /**
   *
   * Voter
   *
   * Constructor for a Voter object. Voter has a voterId and registrar that the
   * voter is . 
   *  
   * @param voterId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateVoter(voterId) {

    return true;

  }

  /**
   *
   * Voter
   *
   * Constructor for a Voter object. Voter has a voterId and registrar that the
   * voter is . 
   *  
   * @param items - an array of choices 
   * @param election - what election you are making ballots for 
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */
  constructor(items, election, voterId) {

    if (this.validateVoter(voterId)) {

      this.items = items;
      this.election = election;
      this.voterId = voterId;
      return this;

    } else {
      throw new Error('the voterId is not valid.');
    }

  }

}
module.exports = Voter;