/// @title Tiny Orcale Sample Client Contract.
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// Notice Original taken from: https://github.com/axic/tinyoracle
/// Notice An example client calling our oracle service

import "TinyOracleAPI.sol";

contract TinyOracleSampleClient is TinyOracleAPI {
  bytes public response;

  function __tinyOracleCallback(uint256 id, bytes _response) onlyFromTinyOracle external {
    response = _response;
  }

  function query() {
    string memory tmp = "hello world";
    query(bytes(tmp));
  }

  function query(bytes query) {
    queryTinyOracle(query);
  }
}
