// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"exchanges","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_asset","type":"address"}],"name":"lookupExchange","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"lookupAll","outputs":[{"name":"","type":"address[]"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"numAssets","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prices","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"assets","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_asset","type":"address"}],"name":"lookup","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"}],
    binary: "60606040526101dc806100126000396000f3606060405236156100825760e060020a60003504632839fc2981146100845780634ea91f27146100ca5780635f39bc22146100d75780638da5cb5b14610113578063a46fe83b14610125578063bc31c1c114610132578063beabacc814610125578063cf35bdd014610178578063d4b6b5da146101be578063ddca3f4314610125575b005b6101c960043560038054829081101561000257506000527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0154600160a060020a031681565b6101c96004355b50600090565b60806040526000606090815260206080908152600060a0819052819060c0908290808381848160046003f1509050019250505060405180910390f35b6101c9600054600160a060020a031681565b60005b6060908152602090f35b6101c960043560028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a031681565b6101c960043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b6101286004356100d1565b600160a060020a03166060908152602090f3",
    unlinked_binary: "60606040526101dc806100126000396000f3606060405236156100825760e060020a60003504632839fc2981146100845780634ea91f27146100ca5780635f39bc22146100d75780638da5cb5b14610113578063a46fe83b14610125578063bc31c1c114610132578063beabacc814610125578063cf35bdd014610178578063d4b6b5da146101be578063ddca3f4314610125575b005b6101c960043560038054829081101561000257506000527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0154600160a060020a031681565b6101c96004355b50600090565b60806040526000606090815260206080908152600060a0819052819060c0908290808381848160046003f1509050019250505060405180910390f35b6101c9600054600160a060020a031681565b60005b6060908152602090f35b6101c960043560028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a031681565b6101c960043560018054829081101561000257506000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60154600160a060020a031681565b6101286004356100d1565b600160a060020a03166060908152602090f3",
    address: "",
    generated_with: "2.0.9",
    contract_name: "RegistrarProtocol"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("RegistrarProtocol error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("RegistrarProtocol error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("RegistrarProtocol error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("RegistrarProtocol error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.RegistrarProtocol = Contract;
  }

})();
