//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:3000', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle

const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, "0x5acefa279af43f77832af04f2bad21d9c8fd819c"); // Copy address of contract deployed on remix and replace this address
const Tender = new web3.eth.Contract(TenderJson.abi, "0x63c6e692331c7473c12d3b580f058ea33ca02b14"); // Copy address of contract deployed on remix and replace this address


export async function getAllAccounts() {
  try {
    return web3.eth.getAccounts();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function hasBeenChecked() {
  try {
    return Tender.methods.hasBeenChecked().call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function isOwner(address) {
  try {
    return Tender.methods.isOwner(address).call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function hasWinner() {
  try {
    return Tender.methods.hasWinner().call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function getHash(nonce, amount) {
  try {
    return HashGenerator.methods.generateHash(nonce, amount).call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function getPhase() {
  try {
    return Tender.methods.getPhase().call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function submitHashedBid(account, hash, depositInEth) {
  try {
    let bidBefore = await Tender.methods.hasBidBefore(account).call();
    if (bidBefore) {
      let action = await Tender.methods.makeBid(hash).send({from: account, gas: "6000000"});
      return true;
    } else {
      let action = await Tender.methods.makeBid(hash).send({from: account, value: (depositInEth * Math.pow(10, 18)), gas: "6000000"});
      return true;
    }
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function revealBid(account, nonce, amount) {
  try {
    let action = await Tender.methods.revealBid(nonce, amount).send({from: account, gas: "6000000"});
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function endRevelation(account) {
  try {
    let action = await Tender.methods.endRevelation().send({from: account, gas: "6000000"});
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function closeContract(account) {
  try {
    let action = await Tender.methods.close().send({from: account, gas: "6000000"});
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function reopenTender(account, desc, biddingDuration, revelationDuration, depositAmount) {
  try {
    let action = await Tender.methods.reopenTender(desc, biddingDuration, revelationDuration,depositAmount).send({from: account, gas: "6000000"});
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export async function getProjectDetails() {
  try {
    return Tender.methods.getProjectDetails().call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};

export async function getResult() {
  try {
    return Tender.methods.getResult().call();
  } catch(err) {
    console.log(err);
    throw err;
  }
};
