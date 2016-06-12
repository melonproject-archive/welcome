/// @title Registrar Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Simple Registrar Contract, no adding of assets, no protection against demurrage.
/// @notice Only Function from Token Protocol is transfer, all the others are either
///     accessible via the address and the underlying token contract or
///     are not desirable for the purposes of a vault.

import "RegistrarProtocol.sol";
import "TokenProtocol.sol";


contract Registrar is RegistrarProtocol {

    function Registrar(address[] _assets, address[] _prices, address[] _exchanges) {
        if (_assets.length != _prices.length ||
            _assets.length != _exchanges.length)
          throw;

        owner = msg.sender;
        for (uint i = 0; i < _assets.length; ++i) {
            assets_available[_assets[i]] = true;
            assets.push(_assets[i]);
            prices.push(_prices[i]);
            exchanges.push(_exchanges[i]);
            exchange_for_asset[_assets[i]] = _exchanges[i];
        }
    }

    function numAssets() constant returns (uint) { return assets.length; }

    /// Lookup if asset can be stored in this vault
    function lookup(address _asset) constant returns(bool) {
        return assets_available[_asset];
    }

    /// Lookup if asset can be stored in this vault
    function lookupExchange(address _asset) constant returns (address) {
        return exchange_for_asset[_asset];
    }
}
