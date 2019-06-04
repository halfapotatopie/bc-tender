// const express = require('express');
// const bodyParser = require('body-parser')
// const fs = require("fs");
// //const db = require('./dbfunctions.js');
// const web3 = require('web3');
// const web3Provider = new web3('http://localhost:8545');
// const abi = JSON.parse(fs.readFileSync('./contracts/LIKEToken.abi').toString())
//
// const myContract = new web3Provider.eth.Contract(abi, '0xF2E8EB400bf8860840057c640Ebdfe14EDe22545');
// const ownAddr = '0x05F3F32D9Cc20241992e49E194B8b937a31322F7';
// const fromAddr = '0xCa41DA4E7F72eF19CE1803DCB5D8b2CB236ccB96';
// const contriToAddr = '0x7AEE26993A6180edf2dC29F4d008fE07DC8ed612';
//
// const app = express();
// app.use(bodyParser.json());
//
// web3Provider.eth.getBlockNumber().then(data=>{
//   console.log('Block: '+data);
// })
//
// app.get('/api/home', (req, res) => {
//   console.log('/api/home');
//   web3Provider.eth.getBlockNumber().then((block) => {
//     myContract.methods.totalSupply().call().then((totalSupply) => {
//       myContract.methods.currentSupply().call().then((currentSupply) => {
//         myContract.methods.balanceOf(fromAddr).call().then((bal) => {
//           myContract.methods.balanceOf(contriToAddr).call().then((domainBal) => {
//             res.json({block: block, totalSupply: totalSupply.toNumber(), currentSupply: currentSupply.toNumber(), bal: bal.toNumber(), domainBal: domainBal.toNumber()});
//           })
//         })
//       })
//     })
//   });
// });
//
// app.get('/api/checklike', (req, res) => {
//   console.log('/api/checklike');
//
//   web3Provider.eth.getBlockNumber().then(blockNo=>{
//     if (blockNo % 10 == 5) {
//       console.log('WIN')
//       res.json({win: true});
//     }
//   });
// });
//
// app.post('/api/claim', (req, res) => {
//   console.log('/api/claim');
//
//   let toAddr = req.body.toAddr;
//   let contriTo = req.body.contriTo;
//   let contriToPerc = req.body.contriToPerc;
//   let receivedPerc = 1 - contriToPerc;
//   let rewardAmt = 10;
//
//   myContract.methods.transfer(toAddr, rewardAmt*receivedPerc).send({from: ownAddr}, (error, txHash) => {
//     myContract.methods.transfer(contriToAddr, rewardAmt*contriToPerc).send({from: ownAddr}, (error2, txHash2) => {
//       res.json({claim: true});
//     })
//   });
// })
//
// app.post('/api/spend', (req, res) => {
//   console.log('/api/spend');
//
//   let userAddr = req.body.userAddr;
//   let burnAmt = 5;
//
//   myContract.methods.burn(burnAmt).send({from: userAddr}, (error, txHash) => {
//     res.json({spend: true});
//   })
// })
//
// const port = 8000;
//
// app.listen(port, () => console.log(`Server running on port ${port}`));
