<!-- [![Build Status](https://travis-ci.org/IBM/blockchainbean.svg?branch=master)](https://travis-ci.org/IBM/blockchainbean) -->

# Create a fair evoting application to ensure correct election results with Hyperledger Fabric and IBM Blockchain Platform (Local)

# Steps (Local Deployment)

1. [Clone the Repo](#step-1-clone-the-repo)
2. [Install Dependencies](#step-2-install-dependencies)
3. [Install Contract](#step-4-install-contract)
4. [Instantiate Contract](#step-5-Instantiate-contract)
5. [Submit Transactions](#step-6-submit-transactions)

Note: This repo assumes you have [VSCode](https://code.visualstudio.com/download) 
and [IBM Blockchain VSCode extension](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) installed. If you don't, first install the 
latest version of VSCode, and then install the IBM Blockchain VSCode extension ensuring you 
have the correct [system requirements](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) to run the extension. You will need Docker as 
this is how the extension builds a development Hyperledger Fabric network with a click of a button.

## Step 1. Clone the Repo

Git clone this repo onto your computer in the destination of your choice, then go into the web-app folder:
```
HoreaPorutiu$ git clone https://github.com/IBM/evote
```

## Step 2. Install Dependencies

Navigate to the `web-app/server` directory:

Install required dependencies using NPM:
```
web-app$ npm install --ignore-scripts
```

## Step 3. Start the Fabric Runtime
- First, we need to go to our IBM Blockchain Extension. Click on the IBM Blockchain icon
  in the left side of VSCode (It looks like a square). 
- Next, start your local fabric by clicking on the 
  *three dot symbol* to the right of *LOCAL FABRIC OPS*
  and then *Start Fabric Runtime*.
  <p align="center">
    <img src="startFabric.png">
  </p>
  
- Once the runtime is finished starting (this might take a couple of minutes), under *Local Fabric 
  Ops* you should see *Smart Contracts* and a section for both *installed* and *instantiated*.

  <p align="center">
    <img src="contracts.png">
  </p>


## Step 4. Install Contract

 Now, let's click on *+ Install* and choose the peer that is available. Then the extension will ask you which package to 
 install. Choose *voterContract@6.0.0* which is in your `evote/contract` directory which you just
 
  If all goes well, you should get a notification as shown 
 below.

![packageFile](/docs/successInstall.png)


## Step 5. Instantiate Contract
You guessed it. Next, it's time to instantiate. 
 
  Click on *+ Instantiate* 

<p align="center">
  <img src="instantiate.png">
</p>

and then choose 
 *mychannel* for the channel to instantiate the contract on.

![packageFile](/docs/channel.png)

Next, the extension will ask you 
 to choose a smart contract and version to instantiate. Click on *voterContract@6.0.0*.

 Next, for the optional function, type in *init*.
![packageFile](/docs/function.png)


Leave the arguments blank, and hit *enter* 
 on your keyboard. 
![packageFile](/docs/blank.png)


 This will instantiate the smart contract. You should see the contract 
 under the *instantiated* tab on the left-hand side, as shown in the picture. 

<p align="center">
  <img src="instantiated.png">
</p>

## Step 5. Export Connection Details

- Under *LOCAL FABRIC OPS* and Nodes, right-click on `peer0.org1.example.com` and select
  *Export Connection Profile* and then choose the `evote/web-app/server` directory. Next,
  update the `config.json` file so it looks like this:

```json
{
  "connection_file": "local_fabric_connection.json",
  "appAdmin": "app-admin",
  "appAdminSecret": "app-adminpw",
  "orgMSPID": "Org1MSP",
  "caName": "ca.org1.example.com",
  "userName": "V1",
  "gatewayDiscovery": { "enabled": true, "asLocalhost": false }
}
```

#### Enroll admin
  - First, navigate to the `server` directory, and install the node dependencies.
    ```bash
    cd server
    npm install
    ```

* #### Export Wallet
  - From your blockchain extension, go to the bottom left corner until you see **FABRIC WALLETS**.
  Right-click on **local_fabric_wallet** and export it into the `server` directory.

  <p align="center">
    <img src="exportWallet.png">
  </p>
  
  - Go ahead and rename the wallet to be just **wallet**. This is the way we have 
  our wallet referenced in our files. Your folder structure should look like the following,
  with the admin private and public keys in the wallet directory. 

  <p align="center">
    <img src="folderStructure.png">
  </p>


 Nice. We're pretty much ready to submit transactions on our contract. 