var Survey = artifacts.require("./Survey.sol");
var Signiture = artifacts.require("./Signature.sol");

module.exports = function (deployer) {
    deployer.deploy(Signiture).then(function () {
        return deployer.deploy(Survey, Signiture.address);
    }).then(function () { })
};