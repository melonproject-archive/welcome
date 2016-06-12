
import './imagetoken.html';

// template events
Template.components_imagetoken.events({
});

// template handlebar helper methods
Template.components_imagetoken.helpers({
	/**
    Convert Wei to Ether Values

    @method (fromWei)
    */

	'fromWei': function(weiValue, type){
		return web3.fromWei(weiValue, type).toString(10);
	},


	/**
    Get Eth Accounts

    @method (accounts)
    */

	'accounts': function(){
		return EthAccounts.find({});
	},
});
