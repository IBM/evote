/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const MyAssetContract = require('./lib/my-asset-contract');
const MyQueryContract = require('./lib/query');
const MyHelperContract = require('./lib/HelperFunctions');


module.exports.MyAssetContract = MyAssetContract;
module.exports.MyQueryContract = MyQueryContract;
module.exports.MyHelperContract = MyHelperContract;
module.exports.contracts = [ MyAssetContract, MyQueryContract, MyHelperContract ];
