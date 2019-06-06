//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:3000', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
// const hgChainId = Object.keys(HashGeneratorJson.networks)[0];
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle
// const tChainId = Object.keys(TenderJson.networks)[0]; //picks the first deployed network
                                                            //make sure this is the right deployed network
const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, "0x8fa32c37b04f76a7e14837a311b1ab6f08ebabf8"); // Copy address of contract deployed on remix and replace this address
// const Tender = new web3.eth.Contract(TenderJson.abi, TenderJson.networks[tChainId].address);
const Tender = new web3.eth.Contract(TenderJson.abi, "0xd80b950f1c1b666e92882b51811e48fe4ec5aec7"); // Copy address of contract deployed on remix and replace this address


export function getAllAccounts() {
  return web3.eth.getAccounts();
};

export function getHash(nonce, amount) {
  try {
    return HashGenerator.methods.generateHash(nonce, amount).call();
  } catch(err) {
    throw err;
  }
};

export function getPhase() {
  try {
    return Tender.methods.getPhase().call();
  } catch(err) {
    throw err;
  }
};

export function submitHashedBid(account, hash) {
  try {
    return Tender.methods.makeBid(hash).send({from: account});
  } catch(err) {
    throw err;
  }
};

export function revealBid(account, nonce, amount) {
  try {
    return Tender.methods.revealBid(nonce, amount).send({from: account});
  } catch(err) {
    throw err;
  }
};

export function endRevelation(account) {
  try {
    return Tender.methods.endRevelation().send({from: account});
  } catch(err) {
    throw err;
  }
};

export function closeContract(account) {
  try {
    return Tender.methods.close().send({from: account});
  } catch(err) {
    throw err;
  }
};

export function reopenTender(account, desc, biddingDuration, revelationDuration, depositAmount) {
  try {
    return Tender.methods.reopenTender(desc, biddingDuration, revelationDuration,depositAmount).send({from: account});
  } catch(err) {
    throw err;
  }
};

export function getProjectDetails() {
  try {
    return Tender.methods.getProjectDetails().call();
  } catch(err) {
    throw err;
  }
};

export function getResult() {
  try {
    return Tender.methods.getResults().call();
  } catch(err) {
    throw err;
  }
};
