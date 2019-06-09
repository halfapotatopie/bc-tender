# bc-tender

Works best Node.js v11.
I really don't know about v12 :/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to set up

### Install Node.js and npm

* Install Node.js (comes with npm) from (https://nodejs.org/en/download/current/).

### Install Ganache

* Install Ganache from (https://www.trufflesuite.com/ganache).

### Set up Ganache

* Click new workspace.
* Under the server tab, make sure that the hostname is 127.0.0.1, that the port number is 8545 and network id is 5777.
* Under the chain tab, make sure that the gas limit is above 6000000.
* You can change other settings if you like.
* Once done, click save workspace.

### Set up the app

In the project directory:

#### Run `npm install`

* Installs the necessary dependencies in the project directory.

In the app directory:

#### Run `npm install`

* Installs the necessary dependencies in the app directory.

#### Run `npm start`

* Starts the app on localhost:3000.

### Set up Remix

* Start remix (https://remix.ethereum.org/).
* Make sure that the environment selected is Web3 Provider and that the endpoint is localhost:8545.
* Create a new file and name it 'HashGenerator.sol'.
* From the project directory, open up HashGenerator.sol.
* Copy its content and paste into HashGenerator.sol on Remix.
* Compile it and deploy it.
* Copy the address of the deployed HashGenerator contract and paste it over the address in line 9 of util.js.
* Go back to remix and created another new file.
* Name it 'Tender.sol'.
* From the project directory, open up Tender.sol.
* Copy its content and paste into Tender.sol on Remix.
* Compile it and deploy it with the necessary parameters.
* Copy the address of the deployed Tender contract and paste it over the address in line 10 of util.js.
* Save the changes made and you can now use the Tender app. :)
