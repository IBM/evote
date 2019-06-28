# Create a fair evoting application to ensure correct election results with Hyperledger Fabric and IBM Blockchain Platform

Have you ever wondered how exactly the votes in a presidential election 
counted? What if instead of having volunteers that are spending hours a 
day counting votes manually, we have an app that was backed by blockchain, 
recording each vote made by a voter, ensuring double-voting is not possible?
That's what this code pattern explains how to do. We aim to build a web-app
in which the voter can register with their drivers license, get a unique 
voterId which is used to login to the app, and cast the vote. The vote is 
tallied on the blockchain, and the web-app shows the current standings of the
polls. 

When the reader has completed this code pattern, they will understand how to:

* Create, build, and use the IBM Blockchain Platform service.
* Build a blockchain back-end using Hyperledger Fabric API's
* Create and use a (free) Kubernetes Cluster to deploy and monitor our 
Hyperledger Fabric nodes.
* Deploy a Node.js app that will interact with our deployed smart contract.

# Flow Diagram
<br>
<p align="center">
  <img src="docs/app-architecture.png">
</p>
<br>

# Flow Description
1. The blockchain operator sets up the IBM Blockchain Platform 2.0 service.
2. The IBM Blockchain Platform 2.0 creates a Hyperledger Fabric network on an IBM Kubernetes 
Service, and the operator installs and instantiates the smart contract on the network.
3. The Node.js application server uses the Fabric SDK to interact with the deployed network on IBM Blockchain Platform 2.0 and creates APIs for a web client.
4. The Vue.js client uses the Node.js application API to interact with the network.
5. The user interacts with the Vue.js web interface to cast their ballot and
and query the world state to see current poll standings.

# Included components
*	[IBM Blockchain Platform V2 Beta](https://console.bluemix.net/docs/services/blockchain/howto/ibp-v2-deploy-iks.html#ibp-v2-deploy-iks) gives you total control of your blockchain network with a user interface that can simplify and accelerate your journey to deploy and manage blockchain components on the IBM Cloud Kubernetes Service.
*	[IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) creates a cluster of compute hosts and deploys highly available containers. A Kubernetes cluster lets you securely manage the resources that you need to quickly deploy, update, and scale applications.
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) is designed to assist users in developing, testing, and deploying smart contracts -- including connecting to Hyperledger Fabric environments.

## Featured technologies
+ [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io) is a platform for distributed ledger solutions, underpinned by a modular architecture that delivers high degrees of confidentiality, resiliency, flexibility, and scalability.
+ [Node.js](https://nodejs.org) is an open source, cross-platform JavaScript run-time environment that executes server-side JavaScript code.
+ [Vue.js](https://vuejs.org/) Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications.

# Watch the Video - Create a fair trade supply network with Hyperledger Fabric 1.4 (Cloud)

[![](docs/ibpVideo.png)](https://www.youtube.com/watch?v=8wtHsD7-kS4)

# Watch the Video - Create a fair trade supply network with Hyperledger Fabric 1.4 (Local)

[![](docs/local.png)](https://www.youtube.com/watch?v=mG2TCIPlvk0)

## Prerequisites

This pattern assumes you have an **IBM Cloud account**, **VSCode** and **IBM Blockchain Platform Extension for VSCode installed**

- [IBM Cloud account](https://cloud.ibm.com/registration/?target=%2Fdashboard%2Fapps)
- [Install VSCode](https://code.visualstudio.com/download)
- [Install IBM Blockchain Platform Extension for VSCode](https://github.com/IBM-Blockchain/blockchain-vscode-extension)
- [Node v8.x or greater and npm v5.x or greater](https://nodejs.org/en/download/)

# Steps (Cloud Deployment)
> To run a local network, you can find steps [here](./docs/run-local.md).
1. [Clone the Repo](#step-1-clone-the-repo)
2. [Create IBM Cloud services](#step-2-create-ibm-cloud-services)
3. [Build a network](#step-3-build-a-network)
4. [Deploy voterContract Smart Contract on the network](#step-4-deploy-voterContract-smart-contract-on-the-network)
5. [Connect application to the network](#step-5-connect-application-to-the-network)
6. [Run the application](#step-6-run-the-application)

## Step 1. Clone the Repo

Git clone this repo onto your computer in the destination of your choice, then go into the web-app folder:
```
HoreaPorutiu$ git clone https://github.com/horeaporutiu/chainVote
```
Navigate to the `web-app/client` directory:
```
HoreaPorutiu$ cd blockchainbean2/web-app/client
```

## Step 2. Install Dependencies

Install required dependencies using NPM:
```
client$ npm install
```

Next, navigate to the `web-app/server` directory:
Install required dependencies using NPM:
```
server$ npm install
```
<!-- 
## Step 3. Package Contract


![packageFile](/docs/rightClick.png)
Right-click under your folders in your workspace area and then click *Add Folder to Workspace* and then highlight the 
`blockchainbean/lib` directory as shown in the picture below, and then click on *add*:

![packageFile](/docs/addSmartContract.png)

 Next, we have to package the smart contract. Click on the *F1* button on your keyboard,
 which will bring up the VSCode command palette. From there, navigate and click on `Package a Smart Contract Project`.
![packageFile](/docs/pack.png)


 Next, the extension will ask the following question:
 ```
 Choose a workspace folder to package
 ```
 Click on the *lib* folder - note we do not want to package our client (i.e. our web-app directory).

  ![packageFile](/docs/lib.png)

 If all went well, you should see the following. 

  ![packageFile](/docs/packageSuccess.png)
 
 Note that this `.cds` file is extremely important if we want to run 
 our smart contract on the cloud.  -->

## Step 2. Create IBM Cloud services

* Create the [IBM Cloud Kubernetes Service](https://cloud.ibm.com/catalog/infrastructure/containers-kubernetes).  You can find the service in the `Catalog`.  For this code pattern, we can use the `Free` cluster, and give it a name.  Note, that the IBM Cloud allows one instance of a free cluster and expires after 30 days. <b>The cluster takes around 10-15
minutes to provision, so please be patient!</b>

<br>
<p align="center">
  <img src="docs/doc-gifs/createIKS.gif">
</p>
<br>

* Create the [IBM Blockchain Platform](https://console.bluemix.net/catalog/services/blockchain/) service on the IBM Cloud.  You can find the service in the `Catalog`, and give a name.

* After your Kubernetes cluster is up and running, you can deploy your IBM Blockchain Platform service on the cluster. The service walks through few steps and finds your cluster on the IBM Cloud to deploy the service on.

* In the gif below, you can see me choosing my free cluster to deploy my IBM Blockchain Platform.

* Once the Blockchain Platform is deployed on the Kubernetes cluster (which can 
take a couple of minutes, you can launch the console to start operating on your
blockchain network by clicking on *Launch the IBM Blockchain Platform*.

<br>
<p align="center">
  <img src="docs/doc-gifs/createIBP.gif">
</p>
<br>


## Step 3. Build a network

We will build a network as provided by the IBM Blockchain Platform [documentation](https://console.bluemix.net/docs/services/blockchain/howto/ibp-console-build-network.html#ibp-console-build-network).  This will include creating a channel with a single peer organization with its own MSP and CA (Certificate Authority), and an orderer organization with its own MSP and CA. We will create the respective identities to deploy peers and operate nodes.

### Create your organization and your entry point to your blockchain

* #### Note: the gifs below show the creation of *Org 1* but we will
create *Voter Org* instead.

* #### Create your Voter Organization CA
  - Click <b>Add Certificate Authority</b>.
  - Click <b>IBM Cloud</b> under <b>Create Certificate Authority</b> and <b>Next</b>.
  - Give it a <b>Display name</b> of `Voter CA`. Note that the gif names the 
  certificate a more generic name.  
  - Specify an <b>Admin ID</b> of `admin` and <b>Admin Secret</b> of `adminpw`.

<br>
<p align="center">
  <img src="docs/doc-gifs/voterCA.gif">
</p>
<br>


* #### Use your CA to register identities
  - Select the <b>Voter CA</b> Certificate Authority that we created.
  - First, we will register an admin for our voter organization. Click on the <b>Register User</b> button.  Give an <b>Enroll ID</b> of `voterAdmin`, and <b>Enroll Secret</b> of `voterAdminpw`.  Click <b>Next</b>.  Set the <b>Type</b> for this identity as `client` and select `org1` from the affiliated organizations drop-down list. We will leave the <b>Maximum enrollments</b> and <b>Add Attributes</b> fields blank.
  - We will repeat the process to create an identity of the peer. Click on the <b>Register User</b> button.  Give an <b>Enroll ID</b> of `peer1`, and <b>Enroll Secret</b> of `peer1pw`.  Click <b>Next</b>.  Set the <b>Type</b> for this identity as `peer` and select `org1` from the affiliated organizations drop-down list. We will leave the <b>Maximum enrollments</b> and <b>Add Attributes</b> fields blank.

<br>
<p align="center">
  <img src="docs/doc-gifs/registerIdentities.gif">
</p>
<br>


* #### Create the peer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition</b>.
  - Enter the <b>MSP Display name</b> as `Voter MSP` and an <b>MSP ID</b> of `votermsp`.
  - Under <b>Root Certificate Authority</b> details, specify the peer CA that we created `Voter CA` as the root CA for the organization.
  - Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, `voterAdmin` and `voterAdminpw`. Then, give the Identity name, `Voter Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and export the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Finally click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/voterMSP.gif">
</p>
<br>


* Create a peer
  - On the <b>Nodes</b> page, click <b>Add peer</b>.
  - Click <b>IBM Cloud</b> under Create a new peer and <b>Next</b>.
  - Give your peer a <b>Display name</b> of `Voter Peer`.
  - On the next screen, select `Voter CA` as your <b>Certificate Authority</b>. Then, give the <b>Enroll ID</b> and <b>Enroll secret</b> for the peer identity that you created for your peer, `peer1`, and `peer1pw`. Then, select the <b>Administrator Certificate (from MSP)</b>, `Voter MSP`, from the drop-down list and click <b>Next</b>.
  - Give the <b>TLS Enroll ID</b>, `admin`, and <b>TLS Enroll secret</b>, `adminpw`, the same values are the Enroll ID and Enroll secret that you gave when creating the CA.  Leave the <b>TLS CSR hostname</b> blank.
  - The last side panel will ask you to <b>Associate an identity</b> and make it the admin of your peer. Select your peer admin identity `Voter Admin`.
  - Review the summary and click <b>Submit</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/voterPeer.gif">
</p>
<br>

### Create the node that orders transactions

* #### Create your orderer organization CA
  - Click <b>Add Certificate Authority</b>.
  - Click <b>IBM Cloud</b> under <b>Create Certificate Authority</b> and <b>Next</b>.
  - Give it a unique <b>Display name</b> of `Orderer CA`.  
  - Specify an <b>Admin ID</b> of `admin` and <b>Admin Secret</b> of `adminpw`.

<br>
<p align="center">
  <img src="docs/doc-gifs/ordererCA.gif">
</p>
<br>

* #### Use your CA to register orderer and orderer admin identities
  - In the <b>Nodes</b> tab, select the <b>Orderer CA</b> Certificate Authority that we created.
  - First, we will register an admin for our organization. Click on the <b>Register User</b> button.  Give an <b>Enroll ID</b> of `ordererAdmin`, and <b>Enroll Secret</b> of `ordererAdminpw`.  Click <b>Next</b>.  Set the <b>Type</b> for this identity as `client` and select `org1` from the affiliated organizations drop-down list. We will leave the <b>Maximum enrollments</b> and <b>Add Attributes</b> fields blank.
  - We will repeat the process to create an identity of the orderer. Click on the <b>Register User</b> button.  Give an <b>Enroll ID</b> of `orderer1`, and <b>Enroll Secret</b> of `orderer1pw`.  Click <b>Next</b>.  Set the <b>Type</b> for this identity as `peer` and select `org1` from the affiliated organizations drop-down list. We will leave the <b>Maximum enrollments</b> and <b>Add Attributes</b> fields blank.

<br>
<p align="center">
  <img src="docs/doc-gifs/ordererIdentities.gif">
</p>
<br>


* #### Create the orderer organization MSP definition
  - Navigate to the <b>Organizations</b> tab in the left navigation and click <b>Create MSP definition</b>.
  - Enter the <b>MSP Display name</b> as `Orderer MSP` and an <b>MSP ID</b> of `orderermsp`.
  - Under <b>Root Certificate Authority</b> details, specify the peer CA that we created `Orderer CA` as the root CA for the organization.
  - Give the <b>Enroll ID</b> and <b>Enroll secret</b> for your organization admin, `ordererAdmin` and `ordererAdminpw`. Then, give the <b>Identity name</b>, `Orderer Admin`.
  - Click the <b>Generate</b> button to enroll this identity as the admin of your organization and export the identity to the wallet. Click <b>Export</b> to export the admin certificates to your file system. Finally click <b>Create MSP definition</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/ordererMSP.gif">
</p>
<br>

* #### Create an orderer
  - On the <b>Nodes</b> page, click <b>Add orderer</b>.
  - Click <b>IBM Cloud</b> and proceed with <b>Next</b>.
  - Give your peer a <b>Display name</b> of `Orderer`.
  - On the next screen, select `Orderer CA` as your <b>Certificate Authority</b>. Then, give the <b>Enroll ID</b> and <b>Enroll secret</b> for the peer identity that you created for your orderer, `orderer1`, and `orderer1pw`. Then, select the <b>Administrator Certificate (from MSP)</b>, `Orderer MSP`, from the drop-down list and click <b>Next</b>.
  - Give the <b>TLS Enroll ID</b>, `admin`, and <b>TLS Enroll secret</b>, `adminpw`, the same values are the Enroll ID and Enroll secret that you gave when creating the CA.  Leave the <b>TLS CSR hostname</b> blank.
  - The last side panel will ask to <b>Associate an identity</b> and make it the admin of your peer. Select your peer admin identity `Orderer Admin`.
  - Review the summary and click <b>Submit</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/createOrderer.gif">
</p>
<br>

* #### Add organization as Consortium Member on the orderer to transact
  - Navigate to the <b>Nodes</b> tab, and click on the <b>Orderer</b> that we created.
  - Under <b>Consortium Members</b>, click <b>Add organization</b>.
  - From the drop-down list, select `Voter MSP`, as this is the MSP that represents the peer's Voter organization.
  - Click <b>Submit</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/consortium.gif">
</p>
<br>


### Create and join channel

* #### Create the channel
  - Navigate to the <b>Channels</b> tab in the left navigation.
  - Click <b>Create channel</b>.
  - Give the channel a name, `mychannel`.
  - Select the orderer you created, `Orderer` from the orderers drop-down list.
  - Select the MSP identifying the organization of the channel creator from the drop-down list. This should be `Voter MSP (votermsp)`.
  - Associate available identity as `Voter Admin`.
  - Click <b>Add</b> next to your organization. Make your organization an <b>Operator</b>.
  - Click <b>Create</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/createChannel.gif">
</p>
<br>


* #### Join your peer to the channel
  - Click <b>Join channel</b> to launch the side panels.
  - Select your `Orderer` and click <b>Next</b>.
  - Enter the name of the channel you just created. `mychannel` and click <b>Next</b>.
  - Select which peers you want to join the channel, click `Voter Peer` .
  - Click <b>Submit</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/joinChannel.gif">
</p>
<br>

## Step 6. Deploy Blockchainbean2 Smart Contract on the network

* #### Install a smart contract
  - Click the <b>Smart contracts</b> tab to install the smart contract.
  - Click <b>Install smart contract</b> to upload the blockchainbean smart contract package file, which is in the root of the repo we cloned - the file
  is called `voterContract.cds`.
  - Click on <b>Add file</b> and find your packaged smart contract.  
  - Once the contract is uploaded, click <b>Install</b>.


<br>
<p align="center">
  <img src="docs/doc-gifs/installContract.gif">
</p>
<br>

* #### Instantiate smart contract
  - On the smart contracts tab, find the smart contract from the list installed on your peers and click <b>Instantiate</b> from the overflow menu on the right side of the row.
  - On the side panel that opens, select the channel, `mychannel` to instantiate the smart contract on. Click <b>Next</b>.
  - Select the organization members to be included in the policy, `votermsp`.  Click <b>Next</b>.
  - Give <b>Function name</b> of `init` and leave <b>Arguments</b> blank.
  - Click <b>Instantiate</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/instantiateContract.gif">
</p>
<br>

## Step 7. Connect application to the network

* #### Connect with sdk through connection profile
  - Under the Instantiated Smart Contract, click on `Connect with SDK` from the overflow menu on the right side of the row.
  - Choose from the dropdown for <b>MSP for connection</b>, `votermsp`.
  - Choose from <b>Certificate Authority</b> dropdown, `Voter CA`.
  - Download the connection profile by scrolling down and clicking <b>Download Connection Profile</b>.  This will download the connection json which we will use soon to establish connection.
  - You can click <b>Close</b> once the download completes.

<br>
<p align="center">
  <img src="docs/doc-gifs/downloadCCP.gif">
</p>
<br>

* #### Create an application admin
  - Go to the <b>Nodes</b> tab on the left bar, and under <b>Certificate Authorities</b>, choose your organization CA, <b>Org1 CA</b>.
  - Click on <b>Register user</b>.
  - Give an <b>Enroll ID</b> and <b>Enroll Secret</b> to administer your application users, `app-admin` and `app-adminpw`.
  - Choose `client` as <b>Type</b> and any organization for affiliation.  We can pick `org1` to be consistent.
  - You can leave the <b>Maximum enrollments</b> blank.
  - Under <b>Attributes</b>, click on <b>Add attribute</b>.  Give attribute as `hf.Registrar.Roles` = `*`.  This will allow this identity to act as registrar and issues identities for our app.  Click <b>Add-attribute</b>.
  - Click <b>Register</b>.

<br>
<p align="center">
  <img src="docs/doc-gifs/appAdmin.gif">
</p>
<br>


* #### Update application connection
  - Copy the connection profile you downloaded into [server folder](server)
  - Rename the connection profile you downloaded **ibpConnection.json**
  - Update the [config.json](server/config.json) file with:
    - The connection json file name you downloaded.
    - The <b>enroll id</b> and <b>enroll secret</b> for your app admin, which we earlier provided as `app-admin` and `app-adminpw`.
    - The orgMSP ID, which we provided as `votermsp`.
    - The caName, which can be found in your connection json file under "organization" -> "org1msp" -> certificateAuthorities". This would be like an IP address and a port. This is circled in red above.
    - The username you would like to register.
    - Update gateway discovery to `{ enabled: true, asLocalhost: false }` to connect to IBP.

> the current default setup is to connect to a local fabric instance from VS Code

- Once you are done, the final version of the **config.json** should look something like this (note that I took the caName from the above pic):

<br>
<p align="center">
  <img src="docs/doc-gifs/updateConfig.gif">
</p>
<br>

```js
{
    "connection_file": "ibpConnection.json",
    "appAdmin": "app-admin",
    "appAdminSecret": "app-adminpw",
    "orgMSPID": "votermsp",
    "caName": "173.193.106.28:32634",
    "userName": "V1",
    "gatewayDiscovery": { "enabled": true, "asLocalhost": false }
}
```


## Step 8. Run the application

* #### Enroll admin
  - First, navigate to the `web-app/server` directory, and install the node dependencies.
    ```bash
    cd web-app/server
    npm install
    ```
  
  - Run the `enrollAdmin.js` script
    ```bash
    node enrollAdmin.js
    ```

  - You should see the following in the terminal:
    ```bash
    msg: Successfully enrolled admin user app-admin and imported it into the wallet
    ```

  - Start the server:
    ```bash
    npm start
    ```

<br>
<p align="center">
  <img src="docs/doc-gifs/startServer.gif">
</p>
<br>

* #### Start the web client
  - In a new terminal, open the web-app folder from the room blockchainbean2 directory.
    ```bash
    cd web-app/client
    ```

  - Start the client:
    ```bash
    npm run serve
    ```


You can find the app running at http://localhost:8080/  If all goes well, you should see something like the picture below: 

Now, we can start interacting with the app.

First, we need to register as a voter, and create our digital identity with 
which we will submit our vote with. To do this, we will need to enter 
a uniqueId (drivers license) with a registrarId, and our first and last names.
After we do that, and click `register` the world state will be updated with 
our voterId and our name and registrarId. Next, we can login to the app with 
our voterId.

Once we login, we can cast our vote. Since we are voting for the presidential
election for 2020, we can choose the party of our liking. Once we are done, we
can choose submit, and then our vote is cast. As long as this voterId hasn't 
voted before, all is well. Next, we can view the poll standings by clicking
`Get Poll Standings` and clicking `Check Poll`. This will query the world 
state and get the current number of votes for each political party. If we 
want to query for a particular voterId, we can do so in the `Query by Key` tab.
If we want to query by object, we can do so by clicking on the `Query by Type` 
tab, and entering a type, such as `voter`. This will return all voter objects 
that are currently in the state. `QueryAll` will return all objects in the state.

That's it for the app. It can be imporoved in a myriad of ways, but hopefully
this gives you inspiration to create apps that improve our current proccesses.
Thank you SO MUCH for taking the time to go through this pattern, and hopefully
you learned something.

## Bonus Step - Deploy your local app to the Cloud
If you want to keep your application running all the time, 
you'll want to deploy it to the cloud. The goal is to deploy
something like this: http://blockchainbeans2.mybluemix.net/

To do this, please follow the guide [here:](https://github.com/horeaporutiu/blockchainbean2/blob/master/docs/deploy.md)

## Conclusion

 So now, you are 
 officially done with this tutorial. So what did you learn?

- How to create a smart contract project with the IBM Blockchain VSCode extension.
- How to deploy your smart contract on a local Hyperledger Fabric network.
- How to update the ledger by submitting transactions to the network.
- Hyperledger stores data as key-value pairs, so to look up data on the network, you need to pass in a key that has a value associated with it. We did that by running the query method.
- How to create a Kubernetes Cluster and IBM Blockchain Platform V2 Beta service and to connect our client Loopback application to our cloud service via the connection profile we downloaded.
- How to view the ledger of a specific channel, by clicking on the channel, the ledger, and then the individual transactions. 

So at this point, you know more than me! Hopefully you feel pretty good at this point, and can dive a bit deeper into other, more complex topics, such as how to scale your network, how to optimize performance, etc. But for now, you know all of the basics to run a supply chain network on Hyperledger Fabric, both locally, and on the Cloud.

GREAT JOB! YOU DID IT! :) 

And when you create the cool new startup unicorn after learning a bunch from this tutorial, don't forget to give me, or IBM Developer some credit :) 

## Troubleshooting
If you are getting errors with your IBM Blockchain VSCode extension, ensure 
you have all prerequisites installed here: https://github.com/IBM-Blockchain/blockchain-vscode-extension#requirements

## Related Links
* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [IBM Code Patterns for Blockchain](https://developer.ibm.com/patterns/category/blockchain/)

## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

