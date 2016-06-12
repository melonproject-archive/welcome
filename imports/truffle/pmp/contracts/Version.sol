/// @title FMP Version Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>

import "Core.sol";


contract VersionInterface {
    address public owner;
    address public addrMeta;
    address[] public funds;

    event FundCreated(address _fundAddress, uint indexed _id);

    function numFunds() constant returns (uint) {}
    function createFund(
        address _addrExchange,
        address _addrRegistrar,
        address _addrPerformanceFee,
        address _addrReferenceType
    ) returns (address) {}
    function annihilateFund() returns (address) {}
}


contract Version is VersionInterface {
    /*
     *  METHODS
     */
    function Version(address _addr) {
        owner = msg.sender;
        addrMeta = _addr;
    }

    /*
     *  CREATION METHODS
     */
    function numFunds() constant returns (uint) { return funds.length; }

    function createFund(
        address _addrExchange,
        address _addrRegistrar,
        address _addrPerformanceFee,
        address _addrReferenceType
    ) returns (address)
    {
        // Create new Fund
        address newFundAddr = address(new Core(
          msg.sender,
          _addrExchange,
          _addrRegistrar,
          _addrPerformanceFee,
          _addrReferenceType,
          0
        ));

        // Registrar Fund
        funds.push(newFundAddr);
        FundCreated(newFundAddr, funds.length);
        return newFundAddr;
    }

    /*
     *  ANNIHILATION METHODS
     */
    // Dereference Fund and trigger selfdestruct
    function annihilateFund() returns (address) {}
}
