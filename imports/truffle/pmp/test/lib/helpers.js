var BigNumber = require('bignumber.js');

function checkBalance(balanceReq, numAccounts) {
  var balances = [];
  it('Check that first three accounts have enough balance', () => {
    // Iterate over first numAccounts accounts
    for (i = 0; i < numAccounts; ++i) {
      var balance = web3.eth.getBalance(web3.eth.accounts[i],'ether');
      balances[i] = balance;
      assert.isTrue(balances[i].greaterThan(balanceReq), 'One of the Accounts not funded enough');
    };
  });
  return balances;
};

function initImageToken(addresses, imageTokenParameters) {
  imageTokenParameters.forEach((imageTokenParameter) => {
    it('Initialize ' + imageTokenParameter.tokenSymbol, (done) => {
      ImageToken.new(
        imageTokenParameter.tokenName,
        imageTokenParameter.tokenSymbol,
        imageTokenParameter.precision,
        imageTokenParameter.commission
      ).then((instance) => {
        // Address of the Image Token
        addresses.push(instance.address);
      }).then(done).catch(done);
    });
  });
};

function initTPFEfromImageToken(addresses, tokens, priceFeeds, exchanges) {
  it('Prepare ImageToken to be registered', () => {
    for (address of addresses) {
      tokens.push(TokenProtocol.at(address));
      priceFeeds.push(PriceFeedProtocol.at(address));
      /*TODO use ExchangeProtocol instead*/
      exchanges.push(Exchange.at(address));
    }
  });
};

function initRegistrar(register, registerParameters) {
  registerParameters.forEach((registerParameter) => {
    it('Initialize new Registrar Contract', (done) => {
      Registrar.new(
        registerParameter.tokenAddresses,
        registerParameter.priceFeedAddresses,
        registerParameter.exchangeAddresses
      ).then((instance) => {
        /*TODO use registerProtocol instead*/
        register.push(Registrar.at(instance.address));
        // // Rem.:
        // //  Using protocol contract to access underlying functions
        // //  This ensures compatibility of function calls within HS.
        // registerProtocol = RegistrarProtocol.at(instance.address);
      }).then(done).catch(done);
    });
  });
};

/// Calculate Price as stored in Solidity
function calcSolPrice(newPrice, precision) {
  /* Note:
   *  This calculaion is not exact.
   *  Error sources are:
   *    Math.floor and
   *    Finite amount of decimals (precision)
   */
  const power = 18 - precision;
  const divisor = "1e+" + power;
  return Math.floor(newPrice.dividedBy(new BigNumber(divisor)).toNumber())
}

/*TODO incomplete*/
function setPrice(priceFeeds, newPrice) {
  it('Set Price Feed at ' + ' to: ' + newPrice.toNumber(), (done) => {
    var priceFeed = priceFeeds[0];
    var precision;
    // console.log(priceFeed);
    // return priceFeedUST.setPrice(UST.address, newPrice.toNumber(), {from: accounts[0]});
    /*TODO setPrices -> setPrice; careful w priceTickerProtocol! */
    priceFeed.setPrice(priceFeed.address, newPrice, {from: web3.eth.accounts[0]}).then((result) => {
      return priceFeed.precision();
    }).then((result) => {
      precision = result;
      return priceFeed.getPrice(priceFeed.address, {from: web3.eth.accounts[1]});
    }).then((result) => {
      console.log(result);
      assert.strictEqual(result.toNumber(), calcSolPrice(newPrice, precision), 'set and get price not equal');
    }).then(done).catch(done);
  });
};

exports._test = {
  checkBalance: checkBalance,
  initImageToken: initImageToken,
  initTPFEfromImageToken: initTPFEfromImageToken,
  initRegistrar: initRegistrar,
  setPrice: setPrice,
}
