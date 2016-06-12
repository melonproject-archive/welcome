var BigNumber = require('bignumber.js');

contract('Registrar', function(accounts) {

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
    ImageToken.new("Image of USD", "UST", 8, 8, 20).then((instance) => {
      // Rem.:
      //  Using protocol contact to access underlying token contract.
      //  This ensures compatibility of function calls within HS.
      UST = TokenProtocol.at(instance.address);
      return ImageToken.new("Image of EUR", "EUT", 8, 8, 20);
    }).then((instance) => {
      EUT = TokenProtocol.at(instance.address);
      return ImageToken.new("Image of BTC", "BTT", 8, 8, 20);
    }).then((instance) => {
      BTT = TokenProtocol.at(instance.address);
    }).then(done).catch(done);

  });

  it("Set prices of Initialized ImageTokens", (done) => {
    var PriceUST = new BigNumber(13e+18);

    var assets = [];  // Where the Fungibles are
    var prices = [];  // Where the Price Ticker of the Fungibles are
    assets[0] = UST.address;
    assets[1] = EUT.address;
    assets[2] = BTT.address;
    // Special case for ImageToken is, that fungibles and price ticker
    //  are in the same place.
    prices = assets
    console.log(assets);

    // Create Price Ticker with constructor argument
    Registrar.new(assets, assets, {from: accounts[1]}).then((instance) => {
      // Initialize price ticker
      vault = Registrar.at(instance.address);
      // Rem.:
      //  Using protocol contact to access underlying price ticker contract.
      //  This ensures compatibility of function calls within HS.
      vaultProtocol = RegistrarProtocol.at(instance.address);
      // Owner of underlying price ticker
      return vault.owner();
    }).then((result) => {
      assert(accounts[1], result, "Owner is not accounts[1]!");
      // Owner of price ticker protocol contract
      return vaultProtocol.owner();
    }).then((result) => {
      assert(accounts[1], result, "Owner is not accounts[1]!");
      // Owner of price ticker protocol contract
      return vaultProtocol.numAssets();
    }).then((result) => {
      console.log(result.toNumber());
      // console.log(len(assets));
      // assert(len(assets), result, "Registrar not full");
    }).then(done).catch(done);
  });
});
