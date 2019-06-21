//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

//connect to the config file
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;
// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.join(process.cwd(), '/wallet');
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

const util = require('util');

exports.connectToNetwork = async function () {
  
  const gateway = new Gateway();

  try {

    const userExists = await wallet.exists(userName);
    if (!userExists) {
      console.log('An identity for the user ' + userName + ' does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      let response = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
      return response;
    }

    await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

    // Connect to our local fabric
    const network = await gateway.getNetwork('mychannel');


    console.log('Connected to mychannel. ');

    // Get the contract we have installed on the peer
    const contract = await network.getContract('voteChainDemo');


    let networkObj = {
      contract: contract,
      network: network,
      gateway: gateway
    };

    return networkObj;

  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
  } finally {
    console.log('Done connecting to network.');
    // gateway.disconnect();
  }
};

exports.invoke = async function (networkObj, isQuery, func, args) {
  try {
    console.log('inside invoke');
    console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);


    // console.log(util.inspect(JSON.parse(args[0])));

    if (isQuery === true) {
      console.log('inside isQuery');

      if (args) {
        console.log('inside isQuery, args');
        console.log(args);
        let response = await networkObj.contract.evaluateTransaction(func, args);
        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
      } else {

        let response = await networkObj.contract.evaluateTransaction(func);
        console.log(response);
        console.log(`Transaction ${func} without args has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
      }
    } else {
      console.log('notQuery');
      if (args) {
        console.log('notQuery, args');
        console.log('$$$$$$$$$$$$$ args: ');
        console.log(args);
        console.log(func);
        console.log(typeof args);


        // args = args.toString();
        // args = JSON.stringify(args);
        args = JSON.parse(args[0]);

        console.log(util.inspect(args));
        args = JSON.stringify(args);
        console.log(util.inspect(args));

        let response = await networkObj.contract.submitTransaction(func, args);
        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been submitted`);
  
        await networkObj.gateway.disconnect();
  
        return response;


      } else {
        let response = await networkObj.contract.submitTransaction(func);
        console.log(response);
        console.log(`Transaction ${func} with args has been submitted`);
  
        await networkObj.gateway.disconnect();
  
        return response;
      }
    }

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return error;
  }
};

exports.registerVoter = async function (userName) {

  const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
  const fs = require('fs');
  const path = require('path');

  // capture network variables from config.json
  // const configPath = path.join(process.cwd(), './www/blockchain/config.json');
  const configPath = path.join(process.cwd(), './config.json');
  const configJSON = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configJSON);
  // let connection_file = config.connection_file;
  let appAdmin = config.appAdmin;
  let orgMSPID = config.orgMSPID;
  // let userName = config.userName;
  let gatewayDiscovery = config.gatewayDiscovery;

  // const ccpPath = path.join(process.cwd(), './www/blockchain/ibpConnection.json');
  const ccpPath = path.join(process.cwd(), './ibpConnection.json');
  const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
  const ccp = JSON.parse(ccpJSON);

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(userName);
    if (userExists) {
      console.log(`An identity for the user ${userName} already exists in the wallet`);
      return;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: 'org1', enrollmentID: userName, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret });
    const userIdentity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
    wallet.import(userName, userIdentity);
    return userIdentity;
  } catch (error) {
    console.error(`Failed to register user + ${userName} + : ${error}`);
    process.exit(1);
  }
};


// exports.queryWithQueryString = async function (contractObj, args) {
//   try {

//     args = args.toString();
//     // Submit the specified transaction.
//     let response = await contractObj.contract.evaluateTransaction('queryByObjectType', args);
//     console.log(response);
//     console.log('Transaction has been submitted');

//     // Disconnect from the gateway.
//     await contractObj.gateway.disconnect();

//     response.msg = 'queryByObjectType has been submitted';
//     return response;

//   } catch (error) {
//     let response;
//     console.error(`Failed to submit transaction: ${error}`);
//     response.error = error.message;
//     return response;
//   }
// };

// exports.castVote = async function (electionId, voterId) {

//   try {

//     let response = {};

//     // Create a new file system based wallet for managing identities.
//     const walletPath = path.join(process.cwd(), '/wallet');
//     const wallet = new FileSystemWallet(walletPath);
//     console.log(`Wallet path: ${walletPath}`);

//     // Check to see if we've already enrolled the user.
//     const userExists = await wallet.exists(userName);
//     if (!userExists) {
//       console.log('An identity for the user ' + userName + ' does not exist in the wallet');
//       console.log('Run the registerUser.js application before retrying');
//       response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
//       return response;
//     }

//     // Create a new gateway for connecting to our peer node.
//     const gateway = new Gateway();
//     await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

//     // Get the network (channel) our contract is deployed to.
//     const network = await gateway.getNetwork('mychannel');

//     // Get the contract from the network.
//     const contract = network.getContract('voteChainDemo');

//     // Submit the specified transaction.
//     response = await contract.submitTransaction('queryByObjectType', args);
//     console.log(response);
//     console.log('Transaction has been submitted');

//     // Disconnect from the gateway.
//     await gateway.disconnect();

//     response.msg = 'createCar Transaction has been submitted';
//     return response;

//   } catch (error) {
//     let response;
//     console.error(`Failed to submit transaction: ${error}`);
//     response.error = error.message;
//     return response;
//   }
// };