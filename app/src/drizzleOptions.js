import SimpleStorage from "./contracts/SimpleStorage.json";
import ComplexStorage from "./contracts/ComplexStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import Tender from "./contracts/Tender.json";
import HashGenerator from "./contracts/HashGenerator.json";

const options = {
  //need to add tender, hashgenerator into contracts... but cannot be empty
  contracts: [SimpleStorage, ComplexStorage, TutorialToken, Tender, HashGenerator],
  events: { 
    SimpleStorage: ["StorageSet"],
    Tender: ["tenderEndsWithoutWinner", "tenderEndsWithWinner"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
