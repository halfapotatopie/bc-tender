//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
const hgChainId = Object.keys(HashGeneratorJson.networks)[0];
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle
const tChainId = Object.keys(TenderJson.networks)[0]; //picks the first deployed network
                                                            //make sure this is the right deployed network
const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, HashGeneratorJson.networks[hgChainId].address);
const Tender = new web3.eth.Contract(TenderJson.abi, TenderJson.networks[tChainId].address);


export async function getAllAccounts() {
  let accounts = await web3.eth.getAccounts();
  return accounts;
};

export async function getHash(nonce, amount) {
  try {
    let hash = await HashGenerator.methods.generateHash(nonce, amount).call();
    return hash;
  } catch(err) {
    throw err;
  }
};

export async function getPhase() {
  try {
    let phase = await Tender.methods.getPhase().call();
    console.log("this is in util");
    console.log(phase);
    return phase;
  } catch(err) {
    throw err;
  }
};

export async function submitHashedBid(account, hash) {
  try {
    let action = await Tender.methods.makeBid(hash).send({from: account});
    return;
  } catch(err) {
    throw err;
  }
};

export async function revealBid(account, nonce, amount) {
  try {
    let action = await Tender.methods.revealBid(nonce, amount).send({from: account});
    return;
  } catch(err) {
    throw err;
  }
};

export async function endRevelation(account) {
  try {
    let action = await Tender.methods.endRevelation().send({from: account});
  } catch(err) {
    throw err;
  }
};

export async function closeContract(account) {
  try {
    let action = await Tender.methods.close().send({from: account});
  } catch(err) {
    throw err;
  }
};

export async function reopenTender(account, desc, biddingDuration, revelationDuration, depositAmount) {
  try {
    let action = await Tender.methods.reopenTender(desc, biddingDuration, revelationDuration,depositAmount).send({from: account});
    return;
  } catch(err) {
    throw err;
  }
};

export async function getProjectDetails() {
  try {
    let details = await Tender.methods.getProjectDetails().call();
    return details;
  } catch(err) {
    throw err;
  }
};

export async function getResult() {
  try {
    let result = await Tender.methods.getResults().call();
    return result;
  } catch(err) {
    throw err;
  }
};
