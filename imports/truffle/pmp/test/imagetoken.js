var BigNumber = require('bignumber.js');

contract('Image Token', function(accounts) {

  // ImageToken Instances
  var UST = null; // Image of USD
  var EUT = null; // Image of EUR
  var BTT = null; // Image of BTC

  // Price Ticker Instances
  var priceTicker;
  var priceTickerProtocol;
  // Registrar Instances
  var vault;
  var vaultProtocol;

  it("Initialize ImageToken", (done) => {
    // Create ImageToken
    ImageToken.new("Image of USD", "UST", 8, 20).then((instance) => {
      // Rem.:
      //  Using protocol contact to access underlying token contract.
      //  This ensures compatibility of function calls within HS.
      UST = ImageToken.at(instance.address);
      return ImageToken.new("Image of EUR", "EUT", 8, 20);
    }).then((instance) => {
      EUT = ImageToken.at(instance.address);
      return ImageToken.new("Image of BTC", "BTT", 8, 20);
    }).then((instance) => {
      BTT = ImageToken.at(instance.address);
    }).then(done).catch(done);
  });

  it("Collateralize ImageToken", (done) => {

    var sendFunds = [];
    sendFunds.push(new BigNumber(2e+18));
    sendFunds.push(new BigNumber(5e+18));
    sendFunds.push(new BigNumber(7e+18));

    var initialPrices = [];
    // ETH/USD, 0.076923077 ETH/USD, 7.6923077×10¹⁶ Wei/USD
    initialPrices.push(new BigNumber(7.6923077e+16));
    initialPrices.push(new BigNumber(12e+6));
    initialPrices.push(new BigNumber(25e+3));

    UST.securityDeposit().then((result) => {
      console.log(result.toNumber());
      assert.strictEqual(result.toNumber(), 0, 'Not Equal');
      // Collateralize ImageToken
      return UST.increaseDeposit({from: accounts[0], value: sendFunds[0].toString()});
    }).then((result) => {
      return UST.securityDeposit();
    }).then((result) => {
      console.log(result.toNumber());
      assert.strictEqual(result.toNumber(), sendFunds[0].toNumber(), 'Not Equal');
      // Set Prices
      return UST.setPrices(initialPrices[0].toNumber(), 8);
    }).then((result) => {
      return UST.givenPrice();
    }).then((result) => {
      console.log(result.toNumber());
      return UST.buyPrice();
    }).then((result) => {
      console.log(result.toNumber());
      return UST.sellPrice();
    }).then((result) => {
      console.log(result.toNumber());

    }).then(done).catch(done);

  });

  // it("Set prices of Initialized ImageTokens", (done) => {
  //   var PriceUST = new BigNumber(13e+18);
  //
  //   var assets = [];  // Where the Fungibles are
  //   var prices = [];  // Where the Price Ticker of the Fungibles are
  //   assets[0] = UST.address;
  //   assets[1] = EUT.address;
  //   assets[2] = BTT.address;
  //   // Special case for ImageToken is, that fungibles and price ticker
  //   //  are in the same place.
  //   prices = assets;
  //   console.log(assets);
  //
  //   // Create Price Ticker with constructor argument
  //   Registrar.new(assets, assets, {from: accounts[1]}).then((instance) => {
  //     // Initialize price ticker
  //     vault = Registrar.at(instance.address);
  //     // Rem.:
  //     //  Using protocol contact to access underlying price ticker contract.
  //     //  This ensures compatibility of function calls within HS.
  //     vaultProtocol = RegistrarProtocol.at(instance.address);
  //     // Owner of underlying price ticker
  //     return vault.owner();
  //   }).then((result) => {
  //     assert(accounts[1], result, "Owner is not accounts[1]!");
  //     // Owner of price ticker protocol contract
  //     return vaultProtocol.owner();
  //   }).then((result) => {
  //     assert(accounts[1], result, "Owner is not accounts[1]!");
  //     // Owner of price ticker protocol contract
  //     return vaultProtocol.numAssets();
  //   }).then((result) => {
  //     console.log(result.toNumber());
  //     // console.log(len(assets));
  //     // assert(len(assets), result, "Registrar not full");
  //   }).then(done).catch(done);
  // });
});
