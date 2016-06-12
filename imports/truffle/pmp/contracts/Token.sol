/// @title Standard Token Contract.
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Original taken from https://github.com/ConsenSys/Tokens/blob/master/Token_Contracts/contracts/Standard_Token.sol

import "TokenProtocol.sol";


contract Token is TokenProtocol {

    modifier noEther() {if (msg.value > 0) throw; _ }

    function transfer(address _to, uint256 _value) noEther returns (bool success) {
        if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        else
           return false;
    }

    function transferFrom(address _from, address _to, uint256 _value) noEther returns (bool success) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        }
        else
            return false;
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
