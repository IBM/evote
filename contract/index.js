/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const MyAssetContract = require('./lib/voterContract.js');
// const MyQueryContract = require('./lib/query.js');

module.exports.MyAssetContract = MyAssetContract;
// module.exports.MyQueryContract = MyQueryContract;

module.exports.contracts = [ MyAssetContract];



