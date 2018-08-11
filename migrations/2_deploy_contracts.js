var PolarshipCoin = artifacts.require("./PolarshipCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(PolarshipCoin,5000,2,"HoCoin","HC");
};
