/// @title Price Ticker Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Simple and static Performance Fee.

import "PerformanceFeeProtocol.sol";


contract PerformanceFee is PerformanceFeeProtocol {

    modifier ifOwner() { if(msg.sender != owner) throw; _ }

    function PerformanceFee() {
        owner = msg.sender;
        fee = 0;
    }
    function () { throw; }

    function calculatePerformanceFee() ifOwner returns (uint) {}
}
