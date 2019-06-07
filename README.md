# bc-tender

Works best Node.js v11.
I really don't know about v12 :/

How to get front end to show up:
- truffle compile
- run Ganache:
1. Open Ganache workspace
2. **setting (gear icon) > server** Change the port number to **8545**
- truffle migrate
- copy Tender.sol & HashGenerator.sol into Remix; compile & deploy
- copy & paste deployed address into './util.js' into (const) '**HashGenerator**' & '**Tender**'
- cd app
- npm start
