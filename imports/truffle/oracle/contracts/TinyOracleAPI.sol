/// @title Tiny Orcale API Contract.
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// Notice Original taken from: https://github.com/axic/tinyoracle

//
// This is the API file to be included by a user of this oracle
//
import "TinyOracleDispatchProtocol.sol";
import "TinyOracleLookupProtocol.sol";

// The actual part to be included in a client contract
contract TinyOracleAPI {
  address constant lookupContract = 0x0;

  modifier onlyFromTinyOracle {
    TinyOracleLookupProtocol lookup = TinyOracleLookupProtocol(lookupContract);
    if (msg.sender != lookup.getResponseAddress())
      throw;
    _
  }

  function queryTinyOracle(bytes query) internal returns (uint256 id) {
    TinyOracleLookupProtocol lookup = TinyOracleLookupProtocol(lookupContract);
    TinyOracleDispatchProtocol tinyOracle = TinyOracleDispatchProtocol(lookup.getQueryAddress());
    return tinyOracle.query(query);
  }
}
