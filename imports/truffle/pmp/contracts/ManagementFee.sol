/// @title Price Ticker Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Simple and static Management Fee.

import "ManagementFeeProtocol.sol";


contract ManagementFee is ManagementFeeProtocol {

    modifier ifOwner() { if(msg.sender != owner) throw; _ }

    function ManagementFee() {
        owner = msg.sender;
        fee = 0;
    }
    function () { throw; }

    function calculateManagementFee() ifOwner returns (uint) {}
}
