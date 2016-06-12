contract('Fund Version', function(accounts) {

  // Fund Instance
  var Version = null;
  // Module addresses
  var _addrExchange;
  var _addrRegistrar;
  var _addrPriceFeed;
  var _addrPerformanceFee;
  var _addrReferenceType;

  it("Create Funds w/in the Fund Version Contract", (done) => {
    Version = Version.deployed();
    var funds = [];

    // Modules addresses
    _addrExchange = Exchange.address;
    _addrRegistrar = Registrar.address;
    _addrPriceFeed = PriceFeed.address;
    _addrPerformanceFee = PerformanceFee.address;
    _addrReferenceType = ReferenceType.address;

    Version.owner().then(function(result) {
      assert.equal(accounts[0], result, "Owner is not accounts[0]!");
      // Create First Fund
      return Version.createFund(_addrExchange, _addrRegistrar, _addrPriceFeed, _addrPerformanceFee, _addrReferenceType, {from: accounts[1]});
    }).then(function(result) {
      return Version.numFunds();
    }).then((result) => {
      assert.strictEqual(result.toNumber(), 1);
      return Version.funds(0);
    }).then((result) => {
      funds[0] = result;
      assert.isDefined(result, "1st Fund object is undefined!");
      // Create Second Fund
      return Version.createFund(_addrExchange, _addrRegistrar, _addrPriceFeed, _addrPerformanceFee, _addrReferenceType, {from: accounts[2]});
    }).then(function(result) {
      return Version.funds(1);
    }).then((result) => {
      funds[1] = result;
      assert.isDefined(result, "2nd Fund object is undefined!");
      return Version.numFunds();
    }).then((result) => {
      assert.strictEqual(result.toNumber(), 2);
      console.log(' List of all fund addresses:');
      for (i = 0; i < result.toNumber(); ++i) {
          console.log(' ' + (i + 1) + '. Fund at: ', funds[i]);
      }
    }).then(done).catch(done);
  });

});
