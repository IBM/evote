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

## Step 5. Submit Transactions
*Note that this step is the same whether for local or cloud deployment. The only 
different is that we will use queries to see the ledger locally, whereas on cloud 
we can view the ledger via the block explorer on IBM Blockchain Platform *

#### Enroll admin
  - First, navigate to the `server` directory, and install the node dependencies.
    ```bash
    cd server
    npm install
    ```
  - ⚠️ if you get a grpc error run:
    ```bash
    npm rebuild
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


 Nice. We're pretty much ready to submit transactions on our contract. Go ahead and go 
 into your web-app directory and run the query script with the commands shown below. 

 ```
blockchainbean2$ cd web-app
web-app$ node query.js
```
Your output should be the following:

<p align="center">
  <img src="queryScript.png">
</p>

⚠️ if you get a grpc error run:
```sh
web-app$ npm rebuild
web-app$ node query.js
``` 
and 
All we have done, is queried the ledger for all data. 
There is none, since we haven't added anything to the ledger. Ok. Now, let's add our first 
member to the ledger, the grower. To do this, we will start our web-app and interact with our
app to submit transactions to the network. 

### Add Members to the network
Let's bring up a new terminal window, and in that terminal, go to the blockchainbean2 directory that 
we cloned earlier, and start the app in that window with the following command.

 ```
blockchainbean2$ cd web-app
web-app$ npm start
```

In your browser, go to http://localhost:8080/explorer/ If all goes well, you should 
see something like the picture below:
![packageFile](/docs/loopback.png)


and click on `GrowerController`. You should see the Controller expand with the GET/POST methods.
Click on the green `POST/Grower` button and then `Try it out` to the right of the `POST/Grower` button.
This will enable you to write in a request body. Go ahead and copy and paste the following JSON in 
to the request body. P.S. (I have made all the commands available in the `commands.txt` file). 

```
{
  "$class": "org.ibm.coffee.Grower",
  "isFairTrade": true,
  "growerId": "Grower-0201",
  "organization": "Ethiopia Gedeb 1 Banko Gotiti GrainPro",
  "address": {
    "$class": "org.ibm.coffee.Address",
    "city": "Gedeb",
    "country": "Ethiopia",
    "street": "N/A",
    "zip": "N/A"
  }
}
```

Then click the blue `Execute` button under the request body. If all goes well, you should see something similar to 
the image below:

![packageFile](/docs/grower.png)

Great. We have made our first update to the ledger. To make sure things are actually updated,
go ahead and run the query script again: 

 ```
web-app$ node query.js
```

You should see the ledger to be as follows: 

![packageFile](/docs/update.png)

Nice! We made our first update to the ledger. While we're here, let's keep it going! 

Add the trader - go to `/POST/Trader` and then follow the same steps as above,
except add in the following json:

```
{
  "$class": "org.ibm.coffee.Trader",
  "traderId": "Trader-0791",
  "organization": "Royal Coffee New York",
  "address": {
    "$class": "org.ibm.coffee.Address",
    "city": "South Plainfield",
    "country": "USA"
  }
}
```

Same thing with the `/POST/Shipper` now:

```
{
  "$class": "org.ibm.coffee.Shipper",
  "shipperId": "Maersk",
  "organization": "A.P. Moller–Maersk Group",
  "address": {
    "$class": "org.ibm.coffee.Address",
    "city": "Copenhagen",
    "country": "Denmark",
    "street": "N/A",
    "zip": "N/A"
  }
}
```

And the retailer i.e. `/POST/retailer`: 
```
{
  "$class": "org.ibm.coffee.Retailer",
  "retailerId": "BrooklynRoasting",
  "organization": "Brooklyn Roasting Company",
  "address": {
    "$class": "org.ibm.coffee.Address",
    "city": "Brooklyn",
    "country": "USA",
    "street": "25 Jay St",
    "zip": "11201"
  }
}
```

And last but not least, the regulator :) (`/POST/regulator`) 

```
{
  "$class": "org.ibm.coffee.Regulator",
  "regulatorId": "ICO",
  "organization": "International Coffee Organization",
  "address": {
    "$class": "org.ibm.coffee.Address",
    "city": "London",
    "country": "England",
    "street": "22 Berners Street",
    "zip": "N/A"
  }
}
```

Now if we run our usual `node query` we should get the following output 
i.e. all of the members we just added.

```
Submit hello world transaction.
"[{\"Key\":\"BrooklynRoasting\",\"Record\":{\"address\":\"25 Jay St Brooklyn 11201 USA\",\"id\":\"BrooklynRoasting\",\"memberType\":\"retailer\",\"organization\":\"Brooklyn Roasting Company\"}},{\"Key\":\"Grower-0201\",\"Record\":{\"address\":\"N/A Gedeb N/A Ethiopia\",\"id\":\"Grower-0201\",\"memberType\":\"grower\",\"organization\":\"Ethiopia Gedeb 1 Banko Gotiti GrainPro\"}},{\"Key\":\"ICO\",\"Record\":{\"address\":\"22 Berners Street London N/A England\",\"id\":\"ICO\",\"memberType\":\"regulator\",\"organization\":\"International Coffee Organization\"}},{\"Key\":\"Maersk\",\"Record\":{\"address\":\"N/A Copenhagen N/A Denmark\",\"id\":\"Maersk\",\"memberType\":\"shipper\",\"organization\":\"A.P. Moller–Maersk Group\"}},{\"Key\":\"Trader-0791\",\"Record\":{\"address\":\"661 Hadley Rd South Plainfield 07080 USA\",\"id\":\"Trader-0791\",\"memberType\":\"trader\",\"organization\":\"Royal Coffee New York\"}}]"
Disconnect from Fabric gateway.
```

Nice. Let's add some coffee on our chain. That's what the whole point of this was, 
right?

### Add Coffee to the network

Let's do a `/POST/addCoffee` with the following request body:

```
{
  "size": "LARGE",
  "roast": "DARK",
  "batchState": "READY_FOR_DISTRIBUTION",
  "grower": "Grower-0201",
  "transactionId": "txId",
  "timestamp": "4:17PM, Feb 19. 2019"
}
```

Great. At this point, we have a batch of coffee (around 100KG) or so, that 
we are ready to ship across the ocean. But first, we have to upload data from
documents that verify that we are in paying a `fair-trade` price for our coffee.

To do this, we must reference the batchId of coffee we have just created. 
The application randomly assigns a batchId each time we call /POST/addCoffee.

Let's run our query to get our batchId:

 ```
web-app$ node query.js
```

My response (edited) is the following: 

```
{\"Key\":\"hz4dzq6ilk\",\"Record\":{\"batchId\":\"hz4dzq6ilk\",\"batchState\":\"READY_FOR_DISTRIBUTION\",\"grower\":\"Grower-0201\",\"roast\":\"DARK\",\"size\":\"LARGE\",\"timestamp\":\"Tue Feb 19 2019\",\"transactionId\":\"txId\"}}]"
```

From there, I can see my batchId is `hz4dzq6ilk`. We will need this later on.

### Add Supply Chain Data to the Network

Cool. Let's update our fair trade data. Got to `/POST/submitFairTradeData` 
and submit a transaction with the following JSON. 🛑IMPORTANT - you must 
use your own batchId for this to work!! 🛑 (I will keep using this one
`hz4dzq6ilk` but yours will be different!)

Note - we are playing the part of the buyer of the coffee now - in a real-life 
network, I would have to authenticate (with API KEY, or some other security 
mechanism) that I am the buyer of the coffee, and that these reports are for the 
coffee I bought. Let's update the fair trade data from the point of view of the buyer.

```
{
  "reportName": "Fair Trade Coffee Supply Chain Report",
  "organizationDescription": "YCFCU is an Ethiopian coffee producing, processing, and exporting cooperative union founded in 2002. YCFCU represents 23 base level cooperatives, all located in the Gedeo Zone, within the Southern NationsNationalities and Peope (SNNPR) ethnically-based region of Ethiopia. Given that its members depend on coffee as their sole source of income, YCFCU aims to maximize financial returns to its members through its linkages with international markets.",
  "reportYear": "2016",
  "fairtradePremiumInvested": "$182273",
  "investmentTitle1": "School Classroom Addition",
  "investmentAmount1": "$30,626",
  "investmentTitle2": "Road Infrastructure",
  "investmentAmount2": "$43,251",
  "investmentTitle3": "Food Security",
  "investmentAmount3": "$34,411",
  "batchId": "hz4dzq6ilk",
  "transactionId": "7bde4711554a69ff336551b4acbb465648355cbf2b80f6218d3cee59593fe3b3",
  "timestamp": "2018-07-18T02:08:54.365Z"
}
```

Next, let's play the part of the shipper. In a live network the shipper 
would authenticate into the network, and would be allow to /POST (update) 
the ledger with the packing list controller. 

Let's do a `/POST/SubmitPackingListController` with the following json,
but don't forget to use ***YOUR OWN batchId*** :) :

```
{
  "grower": "resource:org.ibm.coffee.Grower#Grower-0201",
  "trader": "resource:org.ibm.coffee.Trader#Trader-0791",
  "PL_Invoice_no": "0067",
  "PL_IssueDate": "2017-09-19T00:00:00.000Z",
  "PL_ICO_no": "010/0150/0128",
  "PL_ICO_Lot": "Lot 7",
  "PL_FDA_NO": "15752850924",
  "PL_Bill_of_Lading_No": "961972237",
  "PL_LoadedVessel": "NorthernMagnum",
  "PL_VesselVoyage_No": "1707",
  "PL_Container_No": "redacted",
  "PL_Seal_no": "ML-Dj0144535 20 DRY 8’6",
  "PL_timestamp": "2018-06-17",
  "batchId": "hz4dzq6ilk",
  "transactionId": "2e3dfb77486cf5ad731777614741fd68c7adea8d87a103bd03e7296f46f87b82",
  "timestamp": "2018-07-19T21:55:41.859Z"
}
```

Now, if we query our batch of coffee by its id, we can see the fair trade and shipping
data associated with it. To do this, simply open your `query.js` file and change 
the following line:

```
let response = await contract.evaluateTransaction('queryAll');
```

to this (but input your own batchId :) :

```
let response = await contract.evaluateTransaction('query', 'hz4dzq6ilk');
```

Then run the query:

```
web-app$ node query.js
```

The response should be as follows: 

```

Submit hello world transaction.
"{\"PL_Bill_of_Lading_No\":\"961972237\",\"PL_Container_No\":\"redacted\",\"PL_FDA_NO\":\"15752850924\",\"PL_ICO_Lot\":\"Lot 7\",\"PL_ICO_no\":\"010/0150/0128\",\"PL_Invoice_no\":\"0067\",\"PL_IssueDate\":\"2017-09-19T00:00:00.000Z\",\"PL_LoadedVessel\":\"NorthernMagnum\",\"PL_Seal_no\":\"ML-Dj0144535 20 DRY 8’6\",\"PL_VesselVoyage_No\":\"1707\",\"PL_timestamp\":\"2018-06-17\",\"batchId\":\"hz4dzq6ilk\",\"batchState\":\"READY_FOR_DISTRIBUTION\",\"fairTradePremiumInvested\":\"$182273\",\"grower\":\"resource:org.ibm.coffee.Grower#Grower-0201\",\"investmentAmount1\":\"$30,626\",\"investmentAmount2\":\"Road Infrastructure\",\"investmentAmount3\":\"Food Security\",\"investmentTitle1\":\"School Classroom Addition\",\"investmentTitle2\":\"$43,251\",\"investmentTitle3\":\"$34,411\",\"orgDescription\":\"YCFCU is an Ethiopian coffee producing, processing, and exporting cooperative union founded in 2002. YCFCU represents 23 base level cooperatives, all located in the Gedeo Zone, within the Southern NationsNationalities and Peope (SNNPR) ethnically-based region of Ethiopia. Given that its members depend on coffee as their sole source of income, YCFCU aims to maximize financial returns to its members through its linkages with international markets.\",\"reportName\":\"Fair Trade Coffee Supply Chain Report\",\"reportYear\":\"2016\",\"roast\":\"DARK\",\"size\":\"LARGE\",\"timestamp\":\"2018-07-19T21:55:41.859Z\",\"trader\":\"resource:org.ibm.coffee.Trader#Trader-0791\",\"transactionId\":\"2e3dfb77486cf5ad731777614741fd68c7adea8d87a103bd03e7296f46f87b82\"}"
```

Note that here we are getting all data that is assocaited with our batchId. I.e.
on our ledger, we keep updating the key `hz4dzq6ilk` with more and more data. So 
that the value of our key keeps expanding with more supply chain data. At the 
end of our app, we can then query and parse the important data as we wish. 

Ok. Enough talk. More data.

Let's submit a transaction that represents the port authority receiving the shipment
after reaching its destination. 

Go to `/POST/SubmitInboundWeightTallyController` and paste the following JSON, except 
with your own batchId:

```
{
  "dateStripped": "2017-10-06T00:00:00.000Z",
  "marks": "010/0150/0128 Lot 7",
  "bagsExpected": "150",
  "condition": "good",
  "insectActivity": "none",
  "batchId": "hz4dzq6ilk",
  "transactionId": "cdcf476897109c6470e476eac2b90c05c223e64681311b2fabbb175f26ac8c8b",
  "timestamp": "2018-07-18T02:10:29.097Z"
}
```

Lastly, let's update our cupping data. Go to /POST/SubmitCuppingController 
and add the following json. Change your batchId. Please.

```
{
  "cupper":"Brian",
  "aroma":"9",
  "flavor":"8",
  "afterTaste":"8",
  "acidity":"8",
  "body":"9",
  "finalScore":"89",
  "batchId": "hz4dzq6ilk",
  "transactionId": "cdcf476897109c6470e476eac2b90c05c223e64681311b2fabbb175f26ac8c8b",
  "timestamp": "2018-07-18T02:10:29.097Z"
}
```

Let's query one last time, to make sure we have everything we need. Query 
for the particular batchId as before:

 ```
web-app$ node query.js
```

The response:

```

"{\"PL_Bill_of_Lading_No\":\"961972237\",\"PL_Container_No\":\"redacted\",
\"PL_FDA_NO\":\"15752850924\",\"PL_ICO_Lot\":\"Lot 7\",\"PL_ICO_no\":\"010/0150/0128\",
\"PL_Invoice_no\":\"0067\",\"PL_IssueDate\":\"2017-09-19T00:00:00.000Z\",
\"PL_LoadedVessel\":\"NorthernMagnum\",\"PL_Seal_no\":\"ML-Dj0144535 20 DRY 8’6\",
\"PL_VesselVoyage_No\":\"1707\",\"PL_timestamp\":\"2018-06-17\",\"acidity\":\"8\",
\"afterTaste\":\"8\",\"aroma\":\"9\",\"bagsExpected\":\"150\",
\"batchId\":\"hz4dzq6ilk\",\"batchState\":\"READY_FOR_DISTRIBUTION\",\"body\":\"9\",
\"condition\":\"good\",\"cupper\":\"Brian\",
\"dateStripped\":\"2017-10-06T00:00:00.000Z\",\"fairTradePremiumInvested\":\"$182273\",
\"finalScore\":\"89\",\"flavor\":\"8\",
\"grower\":\"resource:org.ibm.coffee.Grower#Grower-0201\",\"insectActivity\":\"none\",
\"investmentAmount1\":\"$30,626\",\"investmentAmount2\":\"Road Infrastructure\",
\"investmentAmount3\":\"Food Security\",\"investmentTitle1\":\"School Classroom 
Addition\",\"investmentTitle2\":\"$43,251\",\"investmentTitle3\":\"$34,411\",
\"marks\":\"010/0150/0128 Lot 7\",\"orgDescription\":\"YCFCU is an Ethiopian coffee 
producing, processing, and exporting cooperative union founded in 2002. YCFCU 
represents 23 base level cooperatives, all located in the Gedeo Zone, within the 
Southern NationsNationalities and Peope (SNNPR) ethnically-based region of Ethiopia. 
Given that its members depend on coffee as their sole source of income, YCFCU aims to 
maximize financial returns to its members through its linkages with international 
markets.\",\"reportName\":\"Fair Trade Coffee Supply Chain Report\",
\"reportYear\":\"2016\",\"roast\":\"DARK\",\"size\":\"LARGE\",\"timestamp\":\"Tue Feb 
19 2019\",\"trader\":\"resource:org.ibm.coffee.Trader#Trader-0791\",
\"transactionId\":\"cdcf476897109c6470e476eac2b90c05c223e64681311b2fabbb175f26ac8c8b\"}"
```

Ok. So now that we have all the supply chain data loaded up for our batch, it's 
time to use this batch to pour cups of coffee! Go to the */POST/pourCupController*
and enter the following json *but replace the batchId with your own*:

```
{
  "cupId": "NJB123",
  "batchId": "hz4dzq6ilk",
  "transactionId": "cdcf476897109c6470e476eac2b90c05c223e64681311b2fabbb175f26ac8c8b"
}
```

So that's pretty much it! Now when we add this data to the chain, our web-app 
can then query for this cupId (NJB123) and return the following data.

I.e. in your `query.js` now query for the cupId by changing the following line
```
let response = await contract.evaluateTransaction('queryAll');
```

to this (but input your own batchId :) :

```
let response = await contract.evaluateTransaction('query', 'NJB123');
```

Then run the query:

```
web-app$ node query.js
```

You should get the following output:

```

"{\"barista\":\"Siv\",\"batchId\":\"hz4dzq6ilk\",\"beanType\":\"Ethiopian Natural Yirgacheffe\",
\"class\":\"org.ibm.coffee.pourCup\",\"cupId\":\"NJB123\",\"drinkType\":\"Nitro\",\"lastPour\":\"Wed Feb 20 2019 22:18:46 GMT+0000 
(UTC)\",\"transactionId\":\"cdcf476897109c6470e476eac2b90c05c223e64681311b2fabbb175f26ac8c8b\"}"
```

Cool. That's it! You've now added a cup of coffee on the blockchain, and referenced it to 
our batch (hz4dzq6ilk) so that you can get all the relevant supply chain info on the 
batch of coffee that was used to pour the cup! Woo!!

All the transactions are in the chain and now we can focus on 
querying. Good job :) You are officially a blockchain master now! 
Now it's time to connect our app to the blockchain service running in the
cloud! 
