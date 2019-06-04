const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const Tender = artifacts.require("Tender");
const HashGenerator = artifacts.require("HashGenerator");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(HashGenerator);
  deployer.deploy(Tender, 'abc', 2, 2, 2);
};
