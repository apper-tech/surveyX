var Survey = artifacts.require("./Survey.sol");

module.exports = function (deployer, network, account) {
    deployer.deploy(Survey);
};
