//import web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:3000', null, {});   //set ethereum node RPC

//setup contract object
const HashGeneratorJson = require("./contracts/HashGenerator.json");
// const hgChainId = Object.keys(HashGeneratorJson.networks)[0];
const TenderJson = require("./contracts/Tender.json");  //set ABI output from truffle
// const tChainId = Object.keys(TenderJson.networks)[0]; //picks the first deployed network
                                                            //make sure this is the right deployed network
const HashGenerator = new web3.eth.Contract(HashGeneratorJson.abi, "0xba67eca50fec11ebe0394e94396895ae3dbd02c6"); // Copy address of contract deployed on remix and replace this address
// const Tender = new web3.eth.Contract(TenderJson.abi, TenderJson.networks[tChainId].address);
const Tender = new web3.eth.Contract(TenderJson.abi, "0x16d408aacd238ce1a4fb554910e45ed6ff46d561"); // Copy address of contract deployed on remix and replace this address


export function getAllAccounts() {
  return web3.eth.getAccounts();
};

export function hasBeenChecked() {
  try {
    return Tender.methods.hasBeenChecked().call();
  } catch(err) {
    throw err;
  }
};

export function isOwner(address) {
  try {
    return Tender.methods.isOwner(address).call();
  } catch(err) {
    throw err;
  }
};

export function hasWinner() {
  try {
    return Tender.methods.hasWinner().call();
  } catch(err) {
    throw err;
  }
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

export function submitHashedBid(account, hash, depositInEth) {
  try {
    Tender.methods.hasBidBefore(account).call()
    .then(bidBefore => {
      if (bidBefore) {
        Tender.methods.makeBid(hash).send({from: account})
        .then(res => {
          return true;
        });
      } else {
        Tender.methods.makeBid(hash).send({from: account, value: (depositInEth * Math.pow(10, 18))})
        .then(res => {
          return true;
        });
      }
    });
  } catch(err) {
    throw err;
  }
};

export function revealBid(account, nonce, amount) {
  try {
    Tender.methods.revealBid(nonce, amount).send({from: account})
    .then(res => {
      return true;
    });
  } catch(err) {
    throw err;
  }
};

export function endRevelation(account) {
  try {
    Tender.methods.endRevelation().send({from: account})
    .then(res => {
      return true;
    });
  } catch(err) {
    throw err;
  }
};

export function closeContract(account) {
  try {
    Tender.methods.close().send({from: account})
    .then(res => {
      return true;
    });
  } catch(err) {
    throw err;
  }
};

export function reopenTender(account, desc, biddingDuration, revelationDuration, depositAmount) {
  try {
    Tender.methods.reopenTender(desc, biddingDuration, revelationDuration,depositAmount).send({from: account})
    .then(res => {
      return true;
    });
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
