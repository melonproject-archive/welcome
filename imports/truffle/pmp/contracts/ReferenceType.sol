/// @title Reference Type Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>

import "ReferenceTypeProtocol.sol";


contract ReferenceType is ReferenceTypeProtocol {

    modifier ifOwner() { if(msg.sender != owner) throw; _ }

    function ReferenceType() {
        owner = msg.sender;
        choice = References.ETH;
        fee = 0;
    }
    function () { throw; }
}
