/// @title Tiny Oracle Dispatch Protocol Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// Notice Original taken from: https://github.com/axic/tinyoracle
/// Notice This is to be considered as a protocol on how to access the underlying
/// Tiny Oracle Dispatch Contract

contract TinyOracleDispatchProtocol {
  function query(bytes _query) returns (uint256 id);
}
