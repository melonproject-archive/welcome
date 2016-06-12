// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"existsVersion","outputs":[{"name":"_exists","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"numVersions","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"versions","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"updateVersion","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fundAddress","type":"address"},{"indexed":true,"name":"_id","type":"uint256"}],"name":"VersionUpdated","type":"event"}],
    binary: "606060405260008054600160a060020a0319163317905561021f806100246000396000f36060604052361561004b5760e060020a60003504630800c5fa8114610053578063596ef79c146100c557806387aee00e146100d25780638da5cb5b14610118578063ec3b7b781461012a575b610000610002565b61014e6004356000805b60015481101561016d5782600160a060020a03166001600050828154811015610002576000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031614156100bd57600191505b60010161005d565b6001546060908152602090f35b61015a60043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b61015a600054600160a060020a031681565b61014e60043560008054600160a060020a0390811633919091161461017357610002565b15156060908152602090f35b600160a060020a03166060908152602090f35b50919050565b6001805480820180835582818380158290116101b0578183600052602060002091820191016101b091905b8082111561021b57888155840161019e565b50505091909060005260206000209001600050805473ffffffffffffffffffffffffffffffffffffffff19168417905550600154600160a060020a0383167f659fd78dea2eba445e706470320620352e110f35900ef88b9d7364fcb7c7c2e7836060a3506001919050565b509056",
    unlinked_binary: "606060405260008054600160a060020a0319163317905561021f806100246000396000f36060604052361561004b5760e060020a60003504630800c5fa8114610053578063596ef79c146100c557806387aee00e146100d25780638da5cb5b14610118578063ec3b7b781461012a575b610000610002565b61014e6004356000805b60015481101561016d5782600160a060020a03166001600050828154811015610002576000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031614156100bd57600191505b60010161005d565b6001546060908152602090f35b61015a60043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b61015a600054600160a060020a031681565b61014e60043560008054600160a060020a0390811633919091161461017357610002565b15156060908152602090f35b600160a060020a03166060908152602090f35b50919050565b6001805480820180835582818380158290116101b0578183600052602060002091820191016101b091905b8082111561021b57888155840161019e565b50505091909060005260206000209001600050805473ffffffffffffffffffffffffffffffffffffffff19168417905550600154600160a060020a0383167f659fd78dea2eba445e706470320620352e110f35900ef88b9d7364fcb7c7c2e7836060a3506001919050565b509056",
    address: "0xa23ac749c3ee4d880aa9aa5984ae9cfbe1809074",
    generated_with: "2.0.9",
    contract_name: "Admin"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Admin error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Admin error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Admin error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Admin error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Admin = Contract;
  }

})();
