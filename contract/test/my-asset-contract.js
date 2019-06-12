/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MyAssetContract } = require('..');
let Voter = require('../lib/Voter.js');
let VotableItem = require('../lib/VotableItem.js');
let Election = require('../lib/Election.js');
let Ballot = require('../lib/Ballot.js');
const winston = require('winston');


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

  constructor() {
    this.stub = sinon.createStubInstance(ChaincodeStub);
    this.clientIdentity = sinon.createStubInstance(ClientIdentity);
    this.logging = {
      getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
      setLevel: sinon.stub(),
    };
  }

}

describe('MyAssetContract', () => {

  let contract;
  let ctx;

  beforeEach(async () => {
    contract = new MyAssetContract();
    ctx = new TestContext();
    ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"my asset 1001 value"}'));
    ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"my asset 1002 value"}'));
    
  });

  describe('#myAssetExists', () => {

    it('should return true for a my asset', async () => {
      await contract.myAssetExists(ctx, '1001').should.eventually.be.true;
    });

    it('should return false for a my asset that does not exist', async () => {
      await contract.myAssetExists(ctx, '1003').should.eventually.be.false;
    });
  });

  describe('#createMyAsset', () => {

    it('should create a my asset', async () => {
      await contract.createMyAsset(ctx, '1003', 'my asset 1003 value');
      ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"my asset 1003 value"}'));
    });

    it('should throw an error for a my asset that already exists', async () => {
      await contract.createMyAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The my asset 1001 already exists/);
    });

  });

  describe('#readMyAsset', () => {

    it('should return a my asset', async () => {
      await contract.readMyAsset(ctx, '1001').should.eventually.deep.equal({ value: 'my asset 1001 value' });
    });

    it('should throw an error for a my asset that does not exist', async () => {
      await contract.readMyAsset(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
    });

  });

  describe('#updateMyAsset', () => {

    it('should update a my asset', async () => {
      await contract.updateMyAsset(ctx, '1001', 'my asset 1001 new value');
      ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('"my asset 1001 new value"'));
    });

    // it('should throw an error for a my asset that does not exist', async () => {
    //   await contract.updateMyAsset(ctx, '1003', 'my asset 1003 new value').should.be.rejectedWith(/The my asset 1003 does not exist/);
    // });

  });

  describe('#deleteMyAsset', () => {

    it('should delete a my asset', async () => {
      await contract.deleteMyAsset(ctx, '1001');
      ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
    });

    it('should throw an error for a my asset that does not exist', async () => {
      await contract.deleteMyAsset(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
    });

  });

  describe('#init', async () => {

    it('should return array of length 4', async () => {
      let result = await contract.init(ctx);
      result.should.be.an('array');
      result.should.have.lengthOf(4);
    });

  });

  describe('#Voter', async () => {

    it('Voter object should be created successfully, with all correct properties', async () => {
      let voter = new Voter('1', '234', 'Horea', 'Porutiu'); 
      voter.should.haveOwnProperty('name');
      voter.should.haveOwnProperty('voterId');
      voter.should.haveOwnProperty('firstName');
      voter.should.haveOwnProperty('lastName');
      voter.should.haveOwnProperty('ballotCreated');
    });

  });

  describe('#Election', async () => {
    it('Voter object should be created successfully, with all correct properties', async () => {
      let election = new Election('election4431', '2020 Presidential Election', 'USA',
        '2020', 'April 4, 2020', 'April 5, 2020'); 
      election.should.haveOwnProperty('electionId');
      election.should.haveOwnProperty('name');
      election.should.haveOwnProperty('country');
      election.should.haveOwnProperty('year');
      election.should.haveOwnProperty('startDate');
      election.should.haveOwnProperty('startDate');
    });

  });

  describe('#Ballot', async () => {

    it('Ballot object should be created successfully, with all correct properties', async () => {
      let ballot = new Ballot(ctx, 'someThingsToVoteOn', '2020 Pres Election', '1'); 
      ballot.should.haveOwnProperty('votableItems');
      ballot.should.haveOwnProperty('election');
      ballot.should.haveOwnProperty('voterId');
    });

  });

  describe('#VotableIem', async () => {

    it('VotableIem object should be created successfully, with all correct properties', async () => {
      let votableItem = new VotableItem(ctx, '1', 'president', 'should vote for pres', 'false'); 

      votableItem.should.haveOwnProperty('votableId');
      votableItem.should.haveOwnProperty('votableTitle');
      votableItem.should.haveOwnProperty('description');
      votableItem.should.haveOwnProperty('isProp');
      votableItem.votableId.should.have.lengthOf(1);
    });

  });

});