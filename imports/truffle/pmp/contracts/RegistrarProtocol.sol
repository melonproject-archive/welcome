/// @title Registrar Protocol Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice This is to be considered as a protocol on how to access the underlying
/// Registrar Contract

contract RegistrarProtocol {
    address public owner;

    enum Properties { Voting, Demurrage }

    address[] public assets;
    // Price Feed Address
    address[] public prices;
    address[] public exchanges;
    mapping (address => bool) assets_available;
    mapping (address => address) exchange_for_asset; // exchange available for certain asset

    function numAssets() constant returns (uint) {}
    function lookup(address _asset) constant returns(bool) {}
    function lookupExchange(address _asset) constant returns (address) {}
    function lookupAll() constant returns(address[]) {}
    function transfer(address _asset, address _to, uint256 _value) returns (bool success) {}

    function fee() returns(uint) {}
}
