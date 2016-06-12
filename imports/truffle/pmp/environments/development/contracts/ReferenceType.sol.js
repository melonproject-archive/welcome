// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"choice","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "60606040526000805460a060020a60ff0219600160a060020a03199091163317168155600155608b8060316000396000f36060604052361560315760e060020a60003504638da5cb5b8114603757806398f42fe3146055578063ddca3f43146079575b60006002565b608160005473ffffffffffffffffffffffffffffffffffffffff1681565b608160005460ff740100000000000000000000000000000000000000009091041681565b608160015481565b6060908152602090f3",
    unlinked_binary: "60606040526000805460a060020a60ff0219600160a060020a03199091163317168155600155608b8060316000396000f36060604052361560315760e060020a60003504638da5cb5b8114603757806398f42fe3146055578063ddca3f43146079575b60006002565b608160005473ffffffffffffffffffffffffffffffffffffffff1681565b608160005460ff740100000000000000000000000000000000000000009091041681565b608160015481565b6060908152602090f3",
    address: "0x2ce5793c9c81170ffe283ff9ca2eb824e61f5297",
    generated_with: "2.0.9",
    contract_name: "ReferenceType"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("ReferenceType error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("ReferenceType error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("ReferenceType error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("ReferenceType error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.ReferenceType = Contract;
  }

})();
