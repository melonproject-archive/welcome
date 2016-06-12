/// @title Foundation Token Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Original taken from https://ethereum.org/token
/// @notice Token are denominated in [Asset * 10**(uint(precision)))]

import "Token.sol";
import "PriceFeedProtocol.sol";
import "ImageTokenProtocol.sol";


contract owned {
  address public owner;

  function owned() { owner = msg.sender; }

  modifier onlyOwner { if (msg.sender != owner) throw; _ }

  function transferOwnership(address newOwner) onlyOwner { owner = newOwner; }
}


contract ImageToken is owned, Token, PriceFeedProtocol, ImageTokenProtocol {
  /*
   *  FIELDS
   */
  string public name;
  string public symbol;
  uint public commission; // commission in permille
  uint public sellPrice;
  uint public givenPrice;
  uint public buyPrice;
  uint public securityDeposit;
  uint public collateral;
  uint public collRatio = 2000;  // Collateral Ratio 2000/1000 = 2

  uint maxCommission = 100; // Max Commission 100/1000 = 0.1%
  uint denominator = 10**3;

  /*
   *  METHODS
   */
  function ImageToken(
    string tokenName,
    string tokenSymbol,
    uint decimalUnits,
    uint tradeCommission
  ) {
    name = tokenName;                                   // Set the name for display purposes
    symbol = tokenSymbol;                               // Set the symbol for display purposes
    // Defined in price ticker protocol
    precision = decimalUnits;                            // Amount of decimals for display purposes
    if (tradeCommission >= maxCommission) throw;
    /*TODO: uncommented for testing.*/
    commission = tradeCommission;
    /*commission = 0;*/
    givenPrice = 1*10**18;
  }

  function () { throw; }

  /*
   *  METHODS - COLLATERALIZE
   */
  /// Increase Deposit by msg.value
  function increaseDeposit() onlyOwner {
    securityDeposit += msg.value;
  }

  /// Reduce Deposit by amount in Wei
  function reduceDeposit(uint amount) onlyOwner {
    if (securityDeposit + collateral - amount < (collRatio * (totalSupply * buyPrice)) / denominator) throw;
    securityDeposit -= amount;
    msg.sender.send(amount);
  }

  /*
   *  METHODS - PRICE FEED
   */
  function setCommission(uint tradeCommission) onlyOwner noEther {
    if (tradeCommission <= 0 || tradeCommission >= maxCommission)
      throw;
    commission = tradeCommission;
  }

  /// Set prices in Wei/USD; 1 ETH == 10**18 Wei
  function setPrice(address asset, uint newPrice) onlyOwner noEther returns (bool) {
    if (address(asset) != address(this) || newPrice == 0)
      throw;

    // Apply price precision
    givenPrice = newPrice / (10**(uint(18 - precision)));
    /* Formulas:
     *  buyPrice = givenPrice(1-commission/10**3)/110**(uint(3 + precision))
     *  sellPrice = givenPrice(1+commission/10**3)/10**(uint(3 + precision))
     */
    buyPrice = givenPrice*(10**3 + commission);
    sellPrice = givenPrice*(10**3 - commission);
    buyPrice /= 10**3;
    sellPrice /= 10**3;
    /*// Precision
    buyPrice /= 10**(uint(precision));
    sellPrice /= 10**(uint(precision));*/

    return true;
  }

  /// Get price of fundigle asset relative to Wei
  function getPrice(address asset) constant returns (uint) {
    if (address(asset) == address(this))
    return givenPrice;
  }

  /*
   *  METHODS - EXCHANGE
   */
  /// Buy msg.value amount of UST at buyPrice
  function buy() {
    if (buyPrice == 0) throw;
    // calculates the amount
    uint amount = msg.value / buyPrice;
    // checks if it has enough deposit to sell
    /*TODO: uncommented; only for testing*/
    /*if (securityDeposit + collateral < (collRatio * (totalSupply * buyPrice + msg.value)) / denominator) throw; */
    balances[msg.sender] += amount;                   // adds the amount to buyer's balance
    totalSupply += amount;
    collateral += msg.value;
    Transfer(this, msg.sender, amount);                // execute an event reflecting the change
  }

  /// Sell amount of UST at sellPrice
  function sell(uint amount) noEther {
    if (sellPrice == 0) throw;
    if (balances[msg.sender] < amount ) throw;        // checks if the sender has enough to sell
    balances[msg.sender] -= amount;                   // subtracts the amount from seller's balance
    totalSupply -= amount;
    collateral -= amount * sellPrice;
    msg.sender.send(amount * sellPrice);               // sends ether to the seller
    Transfer(msg.sender, this, amount);                // executes an event reflecting on the change
  }
}
