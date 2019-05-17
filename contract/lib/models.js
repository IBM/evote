class Model {

  /**
   * 
   * registrar 
   * 
   * Constructor for a registrar object. Create a registrar 
   * which contains details about the location where you are voting in. 
   * @param distinguishedName - name of registrar
   * @param org - your political party affiliation
   * @param locality - the political district 
   * @param state - the State
   * @param precinctNums - the country
   * @returns - registrar object
   */
  async registrar (distinguishedName, org, locality, state, country, precinctNums) {

    this.distinguishedName = distinguishedName;
    this.org = org;
    this.locality = locality;
    this.state = state;
    this.country = country;
    this.precinctNums = precinctNums;
    this.registrarId = Math.random().toString(36).substring(3);
    return this;
  }

  /**
   * 
   * election 
   * 
   * Constructor for a election object. Create an election. 
   * @param name - name of election
   * @param country - country in which election is
   * @param year - year for the election
   * @param startDate - start date for the election
   * @param endDate - end date for the election
   * @returns - election object
   */
  async election (name, country, year, startDate, endDate) {

    this.name = name;
    this.country = country;
    this.year = year;
    this.startDate = startDate;
    this.endDate = endDate;
    this.electionId = Math.random().toString(36).substring(3);
    return this;
  }

  /**
   * 
   * choice 
   * 
   * Represents one item to vote on in the ballot.
   * @param brief - summary of the item you are voting for
   * @param description - description of what you are voting for
   * @param count - the integer representation of the choice elected
   * @returns - votingRecord object
   */
  async choice (brief, description, count) {

    this.brief = brief;
    this.description = description;
    this.count = count;
    this.choiceId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * voter 
   * 
   * Represents one voter.
   * @param registrar - registrar this voter belongs to
   * @returns - voter object
   */
  async voter(registrar) {
    this.registrar = registrar;
    this.voterId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * votable 
   * 
   * Constructor for a votable object. Create an object to vote on. 
   * @param votableType - either prop or office
   * @param title - the title of the votable
   * @param description - what we are voting for
   * @param choices - array of choices
   * @returns - votable object
   */
  async votable(votableType, title, description, choices) {

    this.votableType = votableType;
    this.title = title;
    this.description = description;
    this.choices = choices;
    this.votableId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * ballot 
   * 
   * Constructor for a ballot object. Create an ballot. 
   * which contains multiple votable items. 
   * @param items - a Votable[] - the items you can vote on on the ballot
   * @param election - an Election - which election you are voting in
   * @param registrar - which registrar you are registered for
   * @returns - ballot object
   */
  async ballot (items, election, registrar) {

    this.items = items;
    this.election = election;
    this.registrar = registrar;
    this.ballotId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * votingRecord 
   * 
   * Records who has voted in a specific election.
   * @param voter - id of a voter 
   * @param election - which election we are talking about
   * @returns - votingRecord object
   */
  async votingRecord (voter, election) {

    this.voter = voter;
    this.election = election;
    this.votingRecordId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * vote 
   * 
   * Records each voter's vote minus their voter information, 
   * as a fair election is an anonymous election. Votes created
   * by the castBallot transaction.   
   * @param voter - id of a voter 
   * @param election - which election we are talking about
   * @param election - which election we are talking about
   * @returns - vote object
   */
  async votingRecord (ballot, election, choices) {

    this.ballot = ballot;
    this.election = election;
    this.choices = choices;
    this.voteId = Math.random().toString(36).substring(3);
    return this;
  
  }

  /**
   * 
   * vote 
   * 
   * Constructor for a vote object. Records each voter's vote minus 
   * their voter information, 
   * as a fair election is an anonymous election. Votes created
   * by the castBallot transaction.
   *
   * @param ballot - which ballot you are voting on.
   * @param election - which election you are voting in.
   * @param choices - choices you have made on your ballot
   * @returns - votee object
   */
  async vote(ballot, election, choices) {

    this.ballot = ballot;
    this.election = election;
    this.choices = choices;
    this.voteId = Math.random().toString(36).substring(3);
    return this;
  
  }





 

  

}
module.exports = Model;