/// @title Tiny Oracle Lookup Protocol Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// Notice Original taken from: https://github.com/axic/tinyoracle
/// Notice This is to be considered as a protocol on how to access the underlying
/// Tiny Oracle Lookup Contract

contract TinyOracleLookupProtocol {
  function getQueryAddress() constant returns (address);
  function getResponseAddress() constant returns (address);
}
