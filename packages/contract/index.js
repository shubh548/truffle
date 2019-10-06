const Schema = require("@truffle/contract-schema");
const Contract = require("./lib/contract");
const truffleContractVersion = require("./package.json").version;
const TezosContract = require("@truffle/tezos-contract");

const contract = (json = {}, networkType = "ethereum") => {
  // TODO: figure out if passing networkName is necessary
  const normalizedArtifactObject = Object.assign({}, Schema.normalize(json), {
    networkType
    //    networkName
  });

  // Note we don't use `new` here at all. This will cause the class to
  // "mutate" instead of instantiate an instance
  if (networkType === "tezos")
    return TezosContract.clone(normalizedArtifactObject);
  return Contract.clone(normalizedArtifactObject);
};

contract.version = truffleContractVersion;

module.exports = contract;

if (typeof window !== "undefined") {
  window.TruffleContract = contract;
}