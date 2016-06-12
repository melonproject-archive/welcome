// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getQueryAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getResponseAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setResponseAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setQueryAddress","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a03191633179055610151806100246000396000f3606060405236156100565760e060020a600035046313af40358114610058578063321db4d41461008b57806341c0e1b51461009e5780637e9ba301146100c45780639d7e6ca8146100d8578063e30fe37a1461010a575b005b61005660043560005433600160a060020a03908116911614156100885760008054600160a060020a031916821790555b50565b61013c600154600160a060020a03165b90565b61005660005433600160a060020a039081169116141561014f5733600160a060020a0316ff5b61013c600254600160a060020a031661009b565b61005660043560005433600160a060020a03908116911614156100885760028054600160a060020a0319168217905550565b61005660043560005433600160a060020a03908116911614156100885760018054600160a060020a0319168217905550565b600160a060020a03166060908152602090f35b56",
    unlinked_binary: "606060405260008054600160a060020a03191633179055610151806100246000396000f3606060405236156100565760e060020a600035046313af40358114610058578063321db4d41461008b57806341c0e1b51461009e5780637e9ba301146100c45780639d7e6ca8146100d8578063e30fe37a1461010a575b005b61005660043560005433600160a060020a03908116911614156100885760008054600160a060020a031916821790555b50565b61013c600154600160a060020a03165b90565b61005660005433600160a060020a039081169116141561014f5733600160a060020a0316ff5b61013c600254600160a060020a031661009b565b61005660043560005433600160a060020a03908116911614156100885760028054600160a060020a0319168217905550565b61005660043560005433600160a060020a03908116911614156100885760018054600160a060020a0319168217905550565b600160a060020a03166060908152602090f35b56",
    address: "",
    generated_with: "2.0.9",
    contract_name: "TinyOracleLookup"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("TinyOracleLookup error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("TinyOracleLookup error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("TinyOracleLookup error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("TinyOracleLookup error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.TinyOracleLookup = Contract;
  }

})();
