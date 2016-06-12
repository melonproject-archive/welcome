/// @title Price Ticker Protocol Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Price Ticker according to the Standard Data Feed Contract; See https://github.com/ethereum/wiki/wiki/Standardized_Contract_APIs#data-feeds
/// @notice This is to be considered as a protocol on how to access the underlying
/// Price Ticker Contract

contract PriceFeedProtocol {
    address public owner = msg.sender;
    uint public precision = 8;  // Precision of price ticker
    function getPrice(address asset) constant returns (uint) {}
    function setPrice(address asset, uint price) returns (bool) {}
    function fee() returns(uint) {}

    /*// Standard Data Feed Contract
    function get(bytes32 _key) returns (uint256 _r) {}
    function set(bytes32 _key, uint256 _value) {}
    function setFee(uint256 _fee) {}
    function setFeeCurrency(address _feeCurrency) {}*/
}
