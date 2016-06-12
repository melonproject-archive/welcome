// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "606060405260548060106000396000f3606060405260e060020a60003504638da5cb5b81146024578063ddca3f43146042575b005b604a60005473ffffffffffffffffffffffffffffffffffffffff1681565b604a60015481565b6060908152602090f3",
    unlinked_binary: "606060405260548060106000396000f3606060405260e060020a60003504638da5cb5b81146024578063ddca3f43146042575b005b604a60005473ffffffffffffffffffffffffffffffffffffffff1681565b604a60015481565b6060908152602090f3",
    address: "",
    generated_with: "2.0.9",
    contract_name: "TradingProtocol"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("TradingProtocol error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("TradingProtocol error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("TradingProtocol error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("TradingProtocol error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.TradingProtocol = Contract;
  }

})();
