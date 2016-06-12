// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"asset","type":"address"},{"name":"price","type":"uint256"}],"name":"setPrice","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"asset","type":"address"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"precision","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a03191633179055600860015560cf8060276000396000f36060604052361560445760e060020a6000350462e4768b8114604a57806341976e0914606c5780638da5cb5b146092578063d3b5dc3b1460a3578063ddca3f431460ab575b60006002565b60886004356024356000805433600160a060020a0390811691161460b1576002565b600435600160a060020a03166000908152600260205260409020545b6060908152602090f35b6088600054600160a060020a031681565b608860015481565b60006088565b600160a060020a03929092168252600260205260409091205560019056",
    unlinked_binary: "606060405260008054600160a060020a03191633179055600860015560cf8060276000396000f36060604052361560445760e060020a6000350462e4768b8114604a57806341976e0914606c5780638da5cb5b146092578063d3b5dc3b1460a3578063ddca3f431460ab575b60006002565b60886004356024356000805433600160a060020a0390811691161460b1576002565b600435600160a060020a03166000908152600260205260409020545b6060908152602090f35b6088600054600160a060020a031681565b608860015481565b60006088565b600160a060020a03929092168252600260205260409091205560019056",
    address: "",
    generated_with: "2.0.9",
    contract_name: "PriceFeed"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeed error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("PriceFeed error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeed error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("PriceFeed error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.PriceFeed = Contract;
  }

})();
