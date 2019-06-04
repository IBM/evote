class Ballot {

  /**
   * recordCastBallot Transaction
   * @param {com.ibm.evenger.votingnetwork.castBallot} castBallot
   * @transaction
   *
   * The logic in this script support the recordCastBallot transaction. This
   * transaction receives a completed ballot and processes the ballot
   * into an active election. Each completed ballot contains a reference
   * to the current election, the ballot upon which the voter is voting, and
   * the choices they've made.
   *
   * Prerequisites:
   *  - The voter is a valid, registered voter defined in the Voter registry
   *  - The supplied election is registered the Election registry
   *  - The cast ballot is defined in the Ballot registry
   *  - Their choices exist in the Choice registry
   */
  async recordCastBallot(castBallot) {
    /*
    * This transaction conducts the following steps:
    * 1. Retrieve the relevant registries
    * 2. Check that the voter has not yet voted
    * 2. Check that their ballot is issued by their registrar
    * 2. Check each of their choices exist on their ballot
    * 2. Check that the election they're trying to vote in is still running
    * 3. Increment the count in all chosen Choices
    * 4. Update the all the chosen Choice records
    * 4. Create a record of the vote with the provided unique identifier
    * 4. Create a record indicating that the voter voted
    *
    * Note: Common list numbers indicate that the step is executed in
    *       parallel with the co-numbered steps.
    */
    /* Preconditions that we need to check: */
    var ballotCorrect = false;
    var choicesOk     = false;
    var electionOpen  = false;
    var hasVoted      = true;
    /* Entities that record a voter's vote and voting record: */
    var newVote         = undefined;
    var newVotingRecord = undefined;
    var votingRecordId  = undefined;
    
    /* Factory to generate new entities */
    const factory = getFactory();
    
    /* DEBUG: this event is purely for probing data at various steps */
    var debugEvent = factory.newEvent(NS, 'DebugEvent');
    
    /* Step 1: Begin parallel retrieval of all needed asset registries */
    /* Required registries for this transaction: */
    const choiceRegistry       = await getAssetRegistry(NS + '.Choice');
    const voteRegistry         = await getAssetRegistry(NS + '.Vote');
    const votingRecordRegistry = await getAssetRegistry(NS + '.VotingRecord');
    
    /* Steps 2: Verify that the preconditions to recording a vote are met */
    var ballotCorrect = verifyCorrectBallot(castBallot.thisBallot, 
                                            castBallot.theVoter);
    var choicesOk     = verifyChoices(castBallot.thisBallot,
                                      castBallot.theVotersChoices);
    var electionOpen  = verifyElectionOpen(castBallot.thisElection);

    /* This last step interfaces with bc and may slow down as size increases */
    var hasVoted      = await verifyNotVoted(votingRecordRegistry,
                                            castBallot.thisElection,
                                            castBallot.theVoter);
    /* TODO: emit an event with details for each failure */
    if (!ballotCorrect) {
      throw new Error('Incorrect ballot ' + castBallot.thisBallot +
                  ' for voter ' + castBallot.theVoter.voterId);
    }
    if (!choicesOk) {
      throw new Error('Encountered incorrect choices whilst recording vote');
    }
    if (!electionOpen) {
      throw new Error('Attempt to cast vote on a closed election!');
    }
    if (hasVoted) {
      throw new Error('Voter ' + castBallot.theVoter.voterId + 
                          ' has already voted in election ' +
                castBallot.thisElection);
    }
    
    /* If we made it this far, we're go to update the count registries */
    for (var i = 0; i < castBallot.theVotersChoices.length; i++) {
      castBallot.theVotersChoices[i].count++;
    }
    /* Generate the required records and populate */
    /*
    * If you wonder why we elected not to use the vote ID as the voting 
    * record ID, it is so that anonymity may be preserved. Best efforts 
    * are taken in this design to ensure that voters are as far digitally 
    * removed from their vote as possible so that democracy may be preserved.
    *
    * Plus this makes checking to see if a voter voted quite easy. It's a 
    * simple key/value lookup.
    */
    votingRecordId  = castBallot.thisElection.electionId + '/' + 
                      castBallot.theVoter.voterId;
    newVote         = factory.newResource(NS, 'Vote',         castBallot.voteId);
    newVotingRecord = factory.newResource(NS, 'VotingRecord', votingRecordId);
    /* Populate the vote: */
    newVote.voteId           = castBallot.voteId;
    newVote.thisBallot       = castBallot.thisBallot;
    newVote.thisElection     = castBallot.thisElection;
    newVote.theVotersChoices = castBallot.theVotersChoices
    /* Populate the voting record: */
    newVotingRecord.votingRecordId = votingRecordId;
    newVotingRecord.voter          = castBallot.theVoter;
    newVotingRecord.election       = castBallot.thisElection;
    
    /* DEBUG: */
    debugEvent.where = 'Inside choiceRegistry Update loop';
    debugEvent.debug = 'Choice is ' + 
      JSON.stringify(castBallot.theVotersChoices);
    emit(debugEvent);
    
    /* Steps 3: Perform the update and then the additions: */
    await choiceRegistry.updateAll(castBallot.theVotersChoices)
    await voteRegistry.add(newVote);
    await votingRecordRegistry.add(newVotingRecord);
  }

  /**
   * 
   * verifyCorrectBallot 
   * 
   * Check to see if ballot is valid
   *
   * @param election - which election you are voting in.
   * @param voter - the voter participating in the election.
   * @returns - boolean indicating if the ballot is correct or not 
   */
  async verifyCorrectBallot(ballot, voter) {
    return ballot.registrar.registrarId == voter.registrar.registrarId;
  }

  /**
   * 
   * verifyChoices
   * 
   * Check to see if election date is valid
   *
   * @param election - which election you are voting in.
   * @returns - boolean indicating if election is open or not. 
   */
  async verifyChoices(ballot, choices) {
    var availableChoices = [];
    var choicesOk = true;
    /* Quickly build a hash map with the IDs of all votable items */
    ballot.items.forEach((votable) => {
      votable.choices.forEach((choice) => {
        availableChoices[choice.choiceId] = true;
      });
    });
    choices.forEach((choice) => {
      if (!availableChoices[choice.choiceId]) {
        choicesOk = false; /* Oops, found something that doesn't work */
      }
    });
    return choicesOk;
  }


  /**
   * 
   * verifyElectionOpen 
   * 
   * Check to see if election date is valid
   *
   * @param election - which election you are voting in.
   * @returns - boolean indicating if election is open or not. 
   */
  async verifyElectionOpen(election) {
    var today = new Date(Date.now());
    var start = election.start_date;
    /* End day set to the day after the election at midnight */
    var end   = election.end_date;

    return today >= start && start < end;
  }

  /**
   * 
   * verifyNotVoted 
   * 
   * Check to see if the voter has voted in this election before. 
   *
   * @param election - which election you are voting in.
   * @returns - boolean indicating if this voter has a voting record for this eleciton.
   */
  async verifyNotVoted(votingRecord, election, voter) {
    return await votingRecord.exists(election.electionId + '/' + voter.voterId);
  }

  /**
    Vote transaction
    @param {com.ibm.evenger.votingnetwork.castBallot} vote
    @transaction
  */
 async oncastBallot(castBallot) {
    
    const factory = getFactory();
    const NS = 'com.ibm.evenger.votingnetwork';
    
    const ballotRace1Choice1 = castBallot.vote2020.theBallot.ballotId.item[0].votableId.choices[0];
    const ballotRace1Choice2 = castBallot.vote2020.theBallot.ballotId.item[0].votableId.choices[1];
    
    const ballotRace2Choice1 = castBallot.vote2020.theBallot.ballotId.item[1].votableId.choices[0];
    const ballotRace2Choice2 = castBallot.vote2020.theBallot.ballotId.item[1].votableId.choices[1];
    
    const ballotRace3Choice1 = castBallot.vote2020.theBallot.ballotId.item[2].votableId.choices[0];
    const ballotRace3Choice2 = castBallot.vote2020.theBallot.ballotId.item[2].votableId.choices[1];
    
    const ballotProp1Choice1 = castBallot.vote2020.theBallot.ballotId.item[3].votableId.choices[0];
    const ballotProp1Choice2 = castBallot.vote2020.theBallot.ballotId.item[3].votableId.choices[1];
    
    const voter = castBallot.theVoter.UUID;
    const election = castBallot.cycle.id;

    const voterChoice1 = castBallot.votable.votableId.choices[0]; 
    const voterChoice2 = castBallot.votable.votableId.choices[1];
    const voterChoice3 = castBallot.votable.votableId.choices[2]; 
    const voterChoice4 = castBallot.votable.votableId.choices[3]; 
    
    
  }


}
module.exports = Ballot;
