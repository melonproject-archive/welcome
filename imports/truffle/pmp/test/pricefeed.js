var BigNumber = require('bignumber.js');

contract('Price Ticker', function(accounts) {

  // Token Instances
  var USD = null;
  var EUR = null;
  var UNI = null; // Ethereum Foundations' Unicorn Token
  // Price Ticker Instances
  var priceTicker;
  var priceTickerProtocol;

  it("Initialize Token", (done) => {
    // Create Token
    Token.new().then((instance) => {
      // Rem.:
      //  Using protocol contact to access underlying token contract.
      //  This ensures compatibility of function calls within HS.
      USD = TokenProtocol.at(instance.address);
      return Token.new();
    }).then((instance) => {
      EUR = TokenProtocol.at(instance.address);
      return Token.new();
    }).then((instance) => {
      UNI = TokenProtocol.at(instance.address);
    }).then(done).catch(done);

  });

  it("Set prices of Initialized tokens", (done) => {
    var PriceUSD = new BigNumber(13e+18);

    // Create Price Ticker with constructor argument
    PriceFeed.new({from: accounts[1]}).then((instance) => {
      // Initialize price ticker
      priceTicker = PriceFeed.at(instance.address);
      // Rem.:
      //  Using protocol contact to access underlying price ticker contract.
      //  This ensures compatibility of function calls within HS.
      priceTickerProtocol = PriceFeedProtocol.at(instance.address);
      // Owner of underlying price ticker
      return priceTicker.owner();
    }).then((result) => {
      assert(accounts[1], result, "Owner is not accounts[1]!");
      // Owner of price ticker protocol contract
      return priceTickerProtocol.owner();
    }).then((result) => {
      assert(accounts[1], result, "Owner is not accounts[1]!");
      return priceTickerProtocol.getPrice(USD.address)
    }).then((result) => {
      assert.strictEqual(result.toNumber(), 0);
      // Only owner of underlying price ticker can access this function
      return priceTicker.setPrice(USD.address, PriceUSD.toNumber(), {from: accounts[1]});
    }).then((result) => {
      return priceTickerProtocol.getPrice(USD.address);
    }).then((result) => {
      assert.strictEqual(result.toNumber(), PriceUSD.toNumber());
    }).then(done).catch(done);
  });
});
