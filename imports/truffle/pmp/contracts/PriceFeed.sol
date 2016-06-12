/// @title Price Ticker Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Simple and static Price Ticker.

import "PriceFeedProtocol.sol";


contract PriceFeed is PriceFeedProtocol {
    mapping (address => uint) prices;

    modifier ifOwner() { if(msg.sender != owner) throw; _ }

    function PriceFeed() {}
    function () { throw; }

    /// Set price of fundigle asset relative to Ether
    /* Ex:
     *  Let asset == UST, let Value of 1 UST == 0.080456789 ETH
     *  and let precision == 8,
     *  => prices[UST] = 08045678
     */
    function setPrice(address asset, uint price) returns (bool) {
        if(msg.sender != owner) throw;
        prices[asset] = price;
        return true;
    }

    /// Get price of fundigle asset relative to Ether with Precision _pricePrecision
    function getPrice(address asset) constant returns (uint) {
        return prices[asset];
    }
}
