// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceInEth","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "6060604052600160a060020a033216600090815260208190526040902061271090556101548061002f6000396000f3606060405260e060020a60003504637bd703e8811461003157806390b98a111461005c578063f8b2cb4f1461008b575b005b6100b16004356000731075aac4220d624067200a040d6912e63242a8056396e4ee3d6100d784610092565b6100c360043560243533600160a060020a03166000908152602081905260408120548290101561011c5761014e565b6100b16004355b600160a060020a0381166000908152602081905260409020545b919050565b60408051918252519081900360200190f35b604080519115158252519081900360200190f35b60026040518360e060020a02815260040180838152602001828152602001925050506020604051808303818660325a03f4156100025750506040515191506100ac9050565b5033600160a060020a039081166000908152602081905260408082208054859003905591841681522080548201905560015b9291505056",
    unlinked_binary: "6060604052600160a060020a033216600090815260208190526040902061271090556101548061002f6000396000f3606060405260e060020a60003504637bd703e8811461003157806390b98a111461005c578063f8b2cb4f1461008b575b005b6100b1600435600073__ConvertLib____________________________6396e4ee3d6100d784610092565b6100c360043560243533600160a060020a03166000908152602081905260408120548290101561011c5761014e565b6100b16004355b600160a060020a0381166000908152602081905260409020545b919050565b60408051918252519081900360200190f35b604080519115158252519081900360200190f35b60026040518360e060020a02815260040180838152602001828152602001925050506020604051808303818660325a03f4156100025750506040515191506100ac9050565b5033600160a060020a039081166000908152602081905260408082208054859003905591841681522080548201905560015b9291505056",
    address: "0x862254b9845848099019e287663a44f3093d8976",
    generated_with: "2.0.9",
    contract_name: "MetaCoin"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("MetaCoin error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("MetaCoin error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.MetaCoin = Contract;
  }

})();
