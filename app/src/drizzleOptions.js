import Tender from "./contracts/Tender.json";
import HashGenerator from "./contracts/HashGenerator.json";

const options = {
  //need to add tender, hashgenerator into contracts... but cannot be empty
  contracts: [Tender, HashGenerator],
  events: {
    Tender: ["tenderEndsWithoutWinner", "tenderEndsWithWinner"]
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
