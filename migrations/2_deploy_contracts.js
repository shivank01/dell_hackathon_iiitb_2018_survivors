var messageContract = artifacts.require("./messageContract.sol");

module.exports = function(deployer) {
  deployer.deploy(messageContract);
};
