/// @title Trading Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Re

import "TradingProtocol.sol";


contract Trading is TradingProtocol {

    modifier ifOwner() { if(msg.sender != owner) throw; _ }

    function Trading() {
        owner = msg.sender;
        fee = 0;
    }
    function () { throw; }

    function calculateTrading() ifOwner returns (uint) {}
}
