/// @title Exchange Contract
/// @author Reto Trinkler <rt@hedge-suisse.com>
/// @notice Original taken from https://github.com/ethereum/dapp-bin/blob/master/standardized_contract_apis/exchange.sol
/// @notice Modifications from https://github.com/HydraChain/hydrachain/pull/45/files

import "Token.sol";


contract Exchange is TokenProtocol {
    struct Order {
        address creator;
        address offerCurrency;
        uint256 offerAmount;
        address wantCurrency;
        uint256 wantAmount;
    }

    event Traded(bytes32 indexed currencyPair, address indexed seller, uint256 offerAmount, address indexed buyer, uint256 wantAmount);
    event Partial(bytes32 indexed currencyPair, address indexed seller, uint256 offerAmount, address indexed buyer, uint256 wantAmount);

    mapping (uint256 => Order) orders;
    uint256 nextOrderId = 1;

    function placeOrder(address _offerCurrency, uint256 _offerAmount, address _wantCurrency, uint256 _wantAmount) returns (uint256 _offerId) {
        if (TokenProtocol(_offerCurrency).transferFrom(msg.sender, this, _offerAmount)) {
            createNewOrder(_offerCurrency, _offerAmount, _wantCurrency, _wantAmount);
        }
        else _offerId = 0;
    }

    function claimOrder(uint256 _offerId) returns (bool _success) {
        if (TokenProtocol(orders[_offerId].wantCurrency).transferFrom(msg.sender, orders[_offerId].creator, orders[_offerId].wantAmount)) {
            TokenProtocol(orders[_offerId].offerCurrency).transfer(msg.sender, orders[_offerId].offerAmount);
            bytes32 currencyPair = bytes32(((uint256(orders[_offerId].offerCurrency) / 2**32) * 2**128) + (uint256(orders[_offerId].wantCurrency) / 2**32));
            Traded(currencyPair, orders[_offerId].creator, orders[_offerId].offerAmount, msg.sender, orders[_offerId].wantAmount);
            orders[_offerId].creator = 0;
            orders[_offerId].offerCurrency = 0;
            orders[_offerId].offerAmount = 0;
            orders[_offerId].wantCurrency = 0;
            orders[_offerId].wantAmount = 0;
            _success = true;
        }
        else _success = false;
    }

    function claimOrderPartial(uint256 _offerId, uint256 _offerAmount, uint256 _wantAmount) returns (bool _success) {
        // Check Amounts
        if (_offerAmount >= orders[_offerId].offerAmount || _wantAmount >= orders[_offerId].wantAmount)
            throw;
        // Check Ratio, to avoid floating numbers
        if (_offerAmount * orders[_offerId].wantAmount != _wantAmount * orders[_offerId].offerAmount)
            throw;
        // Execute partial order
        if (TokenProtocol(orders[_offerId].wantCurrency).transferFrom(msg.sender, orders[_offerId].creator, orders[_offerId].wantAmount)) {
            TokenProtocol(orders[_offerId].offerCurrency).transfer(msg.sender, orders[_offerId].offerAmount);
            bytes32 currencyPair = bytes32(((uint256(orders[_offerId].offerCurrency) / 2**32) * 2**128) + (uint256(orders[_offerId].wantCurrency) / 2**32));
            orders[_offerId].offerAmount -= _offerAmount;
            orders[_offerId].wantAmount -= _wantAmount;
            Partial(currencyPair, orders[_offerId].creator, orders[_offerId].offerAmount, msg.sender, orders[_offerId].wantAmount);
            _success = true;
        }
        else _success = false;

        // Create new Order with remaining Order amounts
        createNewOrder(
            orders[_offerId].offerCurrency,
            orders[_offerId].offerAmount,
            orders[_offerId].wantCurrency,
            orders[_offerId].wantAmount
        );
    }

    function deleteOrder(uint256 _offerId) {
        TokenProtocol(orders[_offerId].offerCurrency).transfer(orders[_offerId].creator, orders[_offerId].offerAmount);
        orders[_offerId].creator = 0;
        orders[_offerId].offerCurrency = 0;
        orders[_offerId].offerAmount = 0;
        orders[_offerId].wantCurrency = 0;
        orders[_offerId].wantAmount = 0;
    }

    function createNewOrder(address _offerCurrency, uint256 _offerAmount, address _wantCurrency, uint256 _wantAmount) private {
        uint256 _offerId = nextOrderId;
        nextOrderId += 1;
        orders[_offerId].creator = msg.sender;
        orders[_offerId].offerCurrency = _offerCurrency;
        orders[_offerId].offerAmount = _offerAmount;
        orders[_offerId].wantCurrency = _wantCurrency;
        orders[_offerId].wantAmount = _wantAmount;
    }
}
