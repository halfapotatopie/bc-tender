const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const Tender = artifacts.require("Tender");
const HashGenerator = artifacts.require("HashGenerator");
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545', null, {});


module.exports = async function(deployer) {
  let accounts = await web3.eth.getAccounts();
  let owner = accounts[0];

  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(HashGenerator);
  deployer.deploy(Tender, {from: owner}, 'Write your project description', 2, 2, 1);
};
