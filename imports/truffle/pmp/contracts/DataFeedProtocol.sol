/// @title Standard Data Feed Contract.
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Original taken from https://github.com/ethereum/wiki/wiki/Standardized_Contract_APIs#data-feeds
/// @notice The data feed standard is a templated standard,
///   ie. in the below descriptions one should be free to replace <t>
///   with any desired data type, eg. uint256, bytes32, address, real192x64.

contract DataFeedProtocol {
    function get(bytes32 _key) returns (uint256 _r) {}
    function set(bytes32 _key, uint256 _value) {}
    function setFee(uint256 _fee) {}
    function setFeeCurrency(address _feeCurrency) {}
}
