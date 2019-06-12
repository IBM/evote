/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const MyAssetContract = require('./lib/my-asset-contract');
const MyQueryContract = require('./lib/query');


module.exports.MyAssetContract = MyAssetContract;
module.exports.MyQueryContract = MyQueryContract;
module.exports.contracts = [ MyAssetContract, MyQueryContract ];
