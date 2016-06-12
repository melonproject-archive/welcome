// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"calculateManagementFee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a0319163317815560015560938060256000396000f36060604052361560315760e060020a6000350463592b79fe811460375780638da5cb5b146060578063ddca3f4314607e575b60006002565b6086600080543373ffffffffffffffffffffffffffffffffffffffff9081169116146090576002565b608660005473ffffffffffffffffffffffffffffffffffffffff1681565b608660015481565b6060908152602090f35b9056",
    unlinked_binary: "606060405260008054600160a060020a0319163317815560015560938060256000396000f36060604052361560315760e060020a6000350463592b79fe811460375780638da5cb5b146060578063ddca3f4314607e575b60006002565b6086600080543373ffffffffffffffffffffffffffffffffffffffff9081169116146090576002565b608660005473ffffffffffffffffffffffffffffffffffffffff1681565b608660015481565b6060908152602090f35b9056",
    address: "0x71eec1cf898f44672fa5dbfe433e535bc4bfd78d",
    generated_with: "2.0.9",
    contract_name: "ManagementFee"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("ManagementFee error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("ManagementFee error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("ManagementFee error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("ManagementFee error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.ManagementFee = Contract;
  }

})();
