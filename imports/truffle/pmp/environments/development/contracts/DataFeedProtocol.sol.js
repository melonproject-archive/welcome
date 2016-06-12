// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_feeCurrency","type":"address"}],"name":"setFeeCurrency","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"get","outputs":[{"name":"_r","type":"uint256"}],"type":"function"}],
    binary: "606060405260488060106000396000f3606060405260e060020a600035046325fa577281146038578063273f494014603857806369fe0e2d1460385780638eaa6ac014603c575b005b6036565b60006060908152602090f3",
    unlinked_binary: "606060405260488060106000396000f3606060405260e060020a600035046325fa577281146038578063273f494014603857806369fe0e2d1460385780638eaa6ac014603c575b005b6036565b60006060908152602090f3",
    address: "",
    generated_with: "2.0.9",
    contract_name: "DataFeedProtocol"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("DataFeedProtocol error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("DataFeedProtocol error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("DataFeedProtocol error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("DataFeedProtocol error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.DataFeedProtocol = Contract;
  }

})();
