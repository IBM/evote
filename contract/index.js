/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const MyAssetContract = require('./lib/my-asset-contract.js');
const MyQueryContract = require('./lib/query.js');
const MyHelperContract = require('./lib/HelperFunctions.js');

module.exports.MyAssetContract = MyAssetContract;
module.exports.MyQueryContract = MyQueryContract;
module.exports.MyHelperContract = MyHelperContract;

module.exports.contracts = [ MyAssetContract, MyHelperContract, MyQueryContract];

// const Ballot = require('./lib/Ballot.js');
// const Election = require('./lib/Election.js');
// const Voter = require('./lib/Voter.js');
// const VotableItem = require('./lib/VotableItem.js');


// module.exports.Ballot = Ballot;
// module.exports.Election = Election;
// module.exports.Voter = Voter;
// module.exports.VotableItem = VotableItem;


