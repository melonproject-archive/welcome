/// @title Assertive
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Taken from dapple
contract Assertive {
    function assert(bool assertion) internal {
        if (!assertion) throw;
    }
}
