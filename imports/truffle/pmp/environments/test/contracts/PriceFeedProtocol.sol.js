// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"price","type":"uint256"}],"name":"setPrice","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"asset","type":"address"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"precision","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "606060405260008054600160a060020a0319163317815560086001556074908190602890396000f3606060405260e060020a6000350462e4768b8114604157806341976e091460415780638da5cb5b14604e578063d3b5dc3b14606c578063ddca3f43146041575b005b60005b6060908152602090f35b604460005473ffffffffffffffffffffffffffffffffffffffff1681565b60446001548156",
    unlinked_binary: "606060405260008054600160a060020a0319163317815560086001556074908190602890396000f3606060405260e060020a6000350462e4768b8114604157806341976e091460415780638da5cb5b14604e578063d3b5dc3b14606c578063ddca3f43146041575b005b60005b6060908152602090f35b604460005473ffffffffffffffffffffffffffffffffffffffff1681565b60446001548156",
    address: "",
    generated_with: "2.0.9",
    contract_name: "PriceFeedProtocol"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeedProtocol error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("PriceFeedProtocol error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeedProtocol error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeedProtocol error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.PriceFeedProtocol = Contract;
  }

})();
