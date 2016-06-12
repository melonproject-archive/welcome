/// @title Core Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>

import "Token.sol";
import "Exchange.sol";
import "ImageToken.sol";
import "ImageTokenProtocol.sol";
import "RegistrarProtocol.sol";
import "PerformanceFeeProtocol.sol";
import "ReferenceTypeProtocol.sol";


contract CoreInterface {
  uint public sumInvested;
  uint public sumWithdrawn;
  uint public sumAssetsBought;
  uint public sumAssetsSold;

  uint public maxInvestment;

  event SharesCreated(address buyer, uint numShares, uint sharePrice);
  event SharesAnnihilated(address seller, uint numShares, uint sharePrice);
  event Refund(address to, uint value);

  event LogString(string text);
  event LogInt(string text, uint value);
  event LogBool(string text, bool value);

  /*function createShares(uint wantedShares) returns (bool) {}*/
  /*function annihilateShares(uint offeredShares, uint wantedAmount) returns (bool) {}*/
}


contract Shares is Token {}


contract Core is owned, CoreInterface, Shares {
  /*
   *  TYPES
   */
  struct Manager {
    uint capital;
    uint performance;
    bool receivedFirstInvestment;
    uint evaluationInterval;  // Calcuate performance for fees every x days
  }
  // Analytics of last time creation/annihilation of shares happened.
  struct Analytics {
    uint value;
    uint performance;
    uint timestamp;
  }
  struct Modules {
    RegistrarProtocol register;
    PerformanceFeeProtocol performanceFee;
    ReferenceTypeProtocol referenceType;
    address addrKYC;
    address addrAML;
  }

  /*
   *  FIELDS
   */
  Manager manager;
  Analytics analytics;
  Modules module;

  /*
   *  METHODS
   */
  function Core(
    address owner_,
    address addrExchange,
    address addrRegistrar,
    address addrPerformanceFee,
    address addrReferenceType,
    uint maxInvestment_
  ) {

    if (maxInvestment_ != 0)
      maxInvestment = maxInvestment_;

    owner = owner_;

    analytics.value = 0;
    analytics.performance = 10**18;
    analytics.timestamp = now;

    module.register = RegistrarProtocol(addrRegistrar);
    module.performanceFee = PerformanceFeeProtocol(addrPerformanceFee);
    module.referenceType = ReferenceTypeProtocol(addrReferenceType);
  }

  function () { throw; }

  /*
   *  METHODS - INVESTING
   */
  /// Invest in a fund by creating shares
  /* Note:
   *  This is can be seen as a none persistent all or nothing limit order, where:
   *  quantity == quantitiyShares and
   *  amount == msg.value (amount investor is willing to pay for the req. quantity)
   */
  function createShares(uint wantedShares) returns (bool) {
    if (msg.value <= 0 || wantedShares == 0)
      throw;

    uint sharePrice;

    sharePrice = calcSharePrice();
    sharePrice = 10**18;

    if (sharePrice == 0) throw;
    uint sentFunds = msg.value;

    if (maxInvestment != 0 &&
        maxInvestment > sharePrice * wantedShares / 10**18)
      throw;

    LogInt('create shares; sentFunds', sentFunds);
    LogInt('create shares; sharePrice', sharePrice);
    LogInt('create shares; if calc', sharePrice * wantedShares / 10**18);

    // Check if enough funds sent for requested quantity of shares.
    uint curSumInvested = 0;
    if (sharePrice * wantedShares / 10**18 <= sentFunds) {
      // Create Shares
      balances[msg.sender] += wantedShares;
      totalSupply += wantedShares;
      curSumInvested = sharePrice * wantedShares / 10**18;
      sumInvested += curSumInvested;
      // Bookkeeping
      analytics.value += curSumInvested;
      // Flag first investment as happened
      if (manager.receivedFirstInvestment == false) {
        manager.receivedFirstInvestment = true;
      }
      SharesCreated(msg.sender, wantedShares, sharePrice);
    }
    // Refund remainder
    uint remainder = 0;
    if (sharePrice * wantedShares / 10**18 < sentFunds) {
      remainder = sentFunds - sharePrice * wantedShares / 10**18;
      LogInt('create shares', remainder);
      msg.sender.send(remainder);
      Refund(msg.sender, remainder);
    }

    return true;
  }

  /*
   *  METHODS - WITHDRAWING
   */
  /// Withdraw from a fund by annihilating shares
  function annihilateShares(uint offeredShares, uint wantedAmount) returns (bool) {
    if (manager.receivedFirstInvestment == false ||
        offeredShares == 0 ||
        wantedAmount == 0)
      throw;

    // Assert if sender has enough shares
    if (balances[msg.sender] < offeredShares)
      throw;

    // First investment happened
    uint sharePrice = calcSharePrice();
    LogInt('annihilateShares::sharePrice', sharePrice);
    if (sharePrice == 0)
      throw;

    /* TODO implement forced withdrawal
     *  Via register contract and exchange
     */
    uint ethBalance = this.balance;
    if (wantedAmount > ethBalance)
      throw;

    // Check if enough shares offered for requested amount of funds.
    uint curSumWithdrawn = 0;
    if (wantedAmount <= sharePrice * offeredShares / 10**18) {
      // Annihilate Shares
      balances[msg.sender] -= offeredShares;
      totalSupply -= offeredShares;
      curSumWithdrawn = sharePrice * offeredShares / 10**18;
      sumWithdrawn += curSumWithdrawn;
      // Bookkeeping
      analytics.value -= curSumWithdrawn;
      // Send Funds
      msg.sender.send(curSumWithdrawn);
      SharesAnnihilated(msg.sender, offeredShares, sharePrice);
    }
    // Refund remainder
    if (wantedAmount < sharePrice * offeredShares / 10**18) {
      uint remainder = sharePrice * offeredShares / 10**18 - wantedAmount;
      msg.sender.send(remainder);
      Refund(msg.sender, remainder);
    }

    return true;
  }

  /*
   *  METHODS - SHARE PRICE
   */
  /// Calculate Share Price in Wei
  function calcSharePrice() constant private returns (uint) {
    uint performance = calcPerformance();
    /* Rem:
     *  sharePrice := performance - perf.fee - manage.fee
     */
    return performance;
  }

  /// Calculate Performance in percent
  function calcPerformance() constant private returns (uint) {
    uint performance;
    uint value = calcValue();

    if (analytics.value == 0) {
      // First investment not made
      performance = 10**18;
    } else if (value == 0) {
      // First investment made; all funds withdrawn
      performance = 10**18;
    } else {
      // First investment made; not all funds withdrawn
      performance = (analytics.performance * value) / analytics.value;
    }

    LogString('------------------------------------------------------------');
    LogInt('calcPerformance; value', value);
    LogInt('calcPerformance; analytics.value', analytics.value);
    LogInt('calcPerformance; performance', performance);
    LogInt('calcPerformance; performance.analytics', analytics.performance);

    // Update Analytics
    analytics.performance = performance;
    analytics.value = value;
    analytics.timestamp = now;

    // Reference Type here!
    return performance;
  }

  /// Calcualte Fund Value in Wei
  function calcValue() constant private returns (uint) {
    // Add ether amount of fund
    /* Rem:
     *  The current Investment (Withdrawal) is not yet stored in the
     *  sumInvested (sumWithdrawn) field.
     * Rem 2:
     *  Since by convention the first asset represents Ether, and the prices
     *  are given in Ether the first price is always equal to one.
     */
    uint value = sumInvested - sumAssetsBought - sumWithdrawn + sumAssetsSold;

    /* Rem:
     *  Assets need to be linked to the right price feed
     */
    // Add assets other then ether
    uint numAssets = module.register.numAssets();
    /*LogInt('calcValue::numAssets', numAssets);*/
    for (uint i = 0; i < numAssets; ++i) {
      // Get asset holdings
      TokenProtocol Token = TokenProtocol(address(module.register.assets(i)));
      uint holdings = Token.balanceOf(address(this));
      // Get asset prices
      PriceFeedProtocol Price = PriceFeedProtocol(address(module.register.prices(i)));
      uint price = Price.getPrice(address(module.register.assets(i)));
      uint precision = Price.precision();
      // Sum up product of asset holdings and asset prices
      /* Rem:
       *  Price Input Unit: [Wei/(Asset * 10**(uint(precision)))]
       *  Holdings Input Unit: [Asset * 10**(uint(precision)))]
       *  with 0 <= precision <= 18 and precision is a natural number.
       */
      value += holdings * price;
      LogInt('calcValue::precision', precision);
      LogInt('calcValue::holdings', holdings);
      LogInt('calcValue::price', price);
      LogInt('calcValue::value', value);
    }

    return value;
  }

  /*
   *  METHODS - TRADING
   */
  /// Buy Image Token directly
  function buy(address wantedAsset, uint wantedAmount) onlyOwner noEther {
    // Assert that asset is available and enought ether in fund
    if (module.register.lookup(address(wantedAsset)) == false ||
        this.balance < wantedAmount)
      throw;

    // Init Image Token Protocol
    /*TODO: use imageTokenProtocol instead*/
    ImageToken imageToken = ImageToken(address(wantedAsset));
    imageToken.buy.value(wantedAmount)();

    // Bookkeeping
    sumAssetsBought += wantedAmount;
  }

  /// Sell Image Token directly
  function sell(address offeredAsset, uint offeredAmount) onlyOwner noEther {
    // Assert that asset is available and enought ether in fund
    if (module.register.lookup(address(offeredAsset)) == false ||
        this.balance < offeredAmount)
      throw;

    // Init Image Token Protocol
    /*TODO: use imageTokenProtocol instead*/
    ImageToken imageToken = ImageToken(address(offeredAsset));
    imageToken.sell(offeredAmount);

    // Bookkeeping
    sumAssetsSold += offeredAmount;
  }

  /// Place an Order on the selected Exchange
  function placeOrder(
    address _offerCurrency,
    uint256 _offerAmount,
    address _wantCurrency,
    uint256 _wantAmount
  ) onlyOwner returns (uint256 _offerId) {
    // Assert that asset is available
    if (module.register.lookup(_wantCurrency) == false) throw;
    if (module.register.lookup(_offerCurrency) == false) throw;
    // Init Exchange
    /* Find exchange module via register module*/
    /*return module.exchange.placeOrder(_offerCurrency, _offerAmount, _wantCurrency, _wantAmount);*/
  }
}
