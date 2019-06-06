//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:3000', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
const hgChainId = Object.keys(HashGeneratorJson.networks)[0];
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle
const tChainId = Object.keys(TenderJson.networks)[0]; //picks the first deployed network
                                                            //make sure this is the right deployed network
const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, HashGeneratorJson.networks[hgChainId].address); // Copy address of contract deployed on remix and replace this address
// const Tender = new web3.eth.Contract(TenderJson.abi, TenderJson.networks[tChainId].address);
const Tender = new web3.eth.Contract(TenderJson.abi, "0x114e928b0bb5d0e4ced9954f6a4c703cc6156f1e"); // Copy address of contract deployed on remix and replace this address

export function test() {
  Tender.methods.test().call({from: "0x9fE09aC44EB64321287Ed1a57198f248BBaF6b96", to: TenderJson.networks[tChainId].address}).then( (err, rsl) => {
    console.log("d123 ",err, rsl)
  });
  return Tender.methods.test().call();
};

export function getAllAccounts() {
  // let accounts = await web3.eth.getAccounts();
  // return accounts;
  return web3.eth.getAccounts();
};

export async function getHash(nonce, amount) {
  try {
    let hash = await HashGenerator.methods.generateHash(nonce, amount).call();
    return hash;
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

// export function getPhase() {
//   Tender.methods.getPhase().call()
//   .then(phase => {
//     return phase;
//   });
// };

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

export function getProjectDetails() {
  try {
    return Tender.methods.getProjectDetails().call();
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
