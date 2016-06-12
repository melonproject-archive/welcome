/* eslint-env mocha */

var BigNumber = require('bignumber.js');
// import BigNumber from 'bignumber.js';
var Helpers = require('./lib/helpers.js');

var Init = require('../../../lib/smart-contracts/init.es6');
// import { Init } from '../../../lib/smart-contracts/init.es6';
contract('Fund', (accounts) => {
  // Balances of Accounts one to three
  const balanceReq = new BigNumber(10e+18);
  const numAccounts = 3;


  // var balances = Helpers._test.checkBalance(balanceReq, numAccounts);
  //
  //
  // // ImageToken Instances
  // const imageTokenParameters = [
  //   {
  //     tokenName: 'Image of USD',
  //     tokenSymbol: 'UST',
  //     precision: 8,
  //     commission: 20,
  //   },
  //   {
  //     tokenName: 'Image of EUR',
  //     tokenSymbol: 'EUT',
  //     precision: 8,
  //     commission: 20,
  //   },
  //   {
  //     tokenName: 'Image of BTC',
  //     tokenSymbol: 'BTT',
  //     precision: 8,
  //     commission: 20,
  //   }
  // ];
  // var addresses = [];
  // Helpers._test.initImageToken(addresses, imageTokenParameters);
  //
  //
  // // Initialize Token, Price Feed and Exchange from ImageToken Instance
  // var tokens = [];
  // var priceFeeds = [];
  // var exchanges = [];
  // Helpers._test.initTPFEfromImageToken(addresses, tokens, priceFeeds, exchanges);
  //
  //
  // // Initialize Registrar Instance
  // /* Rem:
  //  *  Since using ImageToken,
  //  *  Tokens, Price Feeds and Exchange are all in one and the same place
  //  */
  // const registerParameters = [
  //   {
  //     tokenAddresses: addresses,
  //     priceFeedAddresses: addresses,
  //     exchangeAddresses: addresses,
  //   },
  // ];
  // var registerProtocol = [];
  // Helpers._test.initRegistrar(registerProtocol, registerParameters);
  //
  //
  // // Set Prices
  // var priceGraph = [];
  // // Price in Wei/Asset
  // priceGraph.push(new BigNumber(9.0909091e+16)); // 1 ETH = 11 USD
  // priceGraph.push(new BigNumber(1e+17)); // 1 ETH = 10 USD
  // priceGraph.push(new BigNumber(8.3333333e+16)); // 1 ETH = 12 USD
  // Helpers._test.setPrice(priceFeeds, priceGraph[0]);
  //
  // it('1. Fund test', (done) => {
  //   // console.log(priceFeeds[0]);
  //   done();
  // });
  //
  // // // runs after all tests in this block
  // // after(function() {
  // //   console.log(register);
  // // });
  // //
  //
  //
  // // Fund Instance
  // var fund = null;
  // var Version = null;
  // // Module addresses
  // var _addrExchange;
  // var _addrRegistrar;
  // var _addrPriceFeed;
  // var _addrPerformanceFee;
  // var _addrReferenceType;










  // it("Create a fund contract through the fund version contract",(done) => {
  //   Version = Version.deployed();
  //
  //   // Modules addresses
  //   _addrExchange = Exchange.address;
  //   _addrRegistrar = register.address;
  //   _addrPriceFeed = PriceFeed.address;
  //   _addrPerformanceFee = PerformanceFee.address;
  //   _addrReferenceType = ReferenceType.address;
  //
  //   Version.createFund(
  //     _addrExchange,
  //     _addrRegistrar,
  //     _addrPriceFeed,
  //     _addrPerformanceFee,
  //     _addrReferenceType,
  //     {from: accounts[1]}).then(function(result) {
  //     return Version.numFunds();
  //   }).then((result) => {
  //     assert.strictEqual(result.toNumber(), 1);
  //     return Version.funds(0);
  //   }).then((result) => {
  //     fund = Fund.at(result);
  //     return fund.owner();
  //   }).then((result) => {
  //     assert.equal(accounts[1], result, "Owner is not accounts[1]!");
  //   }).then(done).catch(done);
  // });
  //
  // it("Create and Annihilate Shares by investing and withdrawing in a fund and calculate Performance",(done) => {
  //   // Investment Round 1 by Account 1
  //   //  Parameters
  //
  //   /* Investing:
  //    *  Round 1: Exact
  //    *  Rount 2: Overpaid
  //    *  Round 3: Underpaid
  //    */
  //   var wantedShares = [];
  //   wantedShares.push(new BigNumber(2e+18));
  //   wantedShares.push(new BigNumber(3e+18));
  //   wantedShares.push(new BigNumber(7e+18));
  //
  //   var investFunds = [];
  //   investFunds.push(new BigNumber(2e+18));
  //   investFunds.push(new BigNumber(5e+18));
  //   investFunds.push(new BigNumber(6e+18));
  //
  //   var correctPriceToBePaid = [];
  //   correctPriceToBePaid.push(new BigNumber(2e+18));
  //   correctPriceToBePaid.push(new BigNumber(3e+18));
  //   correctPriceToBePaid.push(new BigNumber(7e+18));
  //
  //   /* Buying
  //    *  Round 1:
  //    */
  //   var buyUST = [];
  //   buyUST.push(new BigNumber(1e+18));
  //
  //   /* Withdrawing:
  //    *  Round 1: Exact
  //    *  Rount 2: Overpaid
  //    *  Round 3: Underpaid
  //    */
  //   var withdrawFunds = [];
  //   withdrawFunds.push(new BigNumber(2e+18));
  //   withdrawFunds.push(new BigNumber(1e+18));
  //   withdrawFunds.push(new BigNumber(7e+18));
  //
  //   var offeredShares = [];
  //   offeredShares.push(new BigNumber(2e+18));
  //   offeredShares.push(new BigNumber(1e+18));
  //   offeredShares.push(new BigNumber(7e+18));
  //
  //   var correctPriceToBeReceived = [];
  //   correctPriceToBeReceived.push(new BigNumber(2e+18));
  //   correctPriceToBeReceived.push(new BigNumber(1e+18));
  //   correctPriceToBeReceived.push(new BigNumber(7e+18));
  //
  //   // Subtract investment amount
  //   balances[0] = balances[0].minus(correctPriceToBePaid[0]);
  //   balances[1] = balances[1].minus(correctPriceToBePaid[1]);
  //   balances[2] = balances[2].minus(correctPriceToBePaid[2]);
  //
  //   // Add withdrawal amount
  //   balances[0] = balances[0].add(correctPriceToBeReceived[0]);
  //   balances[1] = balances[1].add(correctPriceToBeReceived[1]);
  //   balances[2] = balances[2].add(correctPriceToBeReceived[2]);
  //
  //
  //   fund.totalSupply().then((result) => {
  //     assert.strictEqual(result.toNumber(), 0);
  //     // ROUND 1
  //     return fund.createShares(wantedShares[0], {from: accounts[0], value: investFunds[0].toString()});
  //   }).then(function(result) {
  //     // Check totalSupply
  //     return fund.totalSupply();
  //   }).then(function(result) {
  //     assert.strictEqual(result.toNumber(), wantedShares[0].toNumber());
  //   }).then(function(result) {
  //     // Check sumInvested
  //     return fund.sumInvested();
  //   }).then(function(result) {
  //     // TODO: calculate sumInvested via Smart Contract
  //     assert.strictEqual(result.toNumber(), investFunds[0].toNumber());
  //   }).then(function(result) {
  //     // ROUND 2
  //     return fund.createShares(wantedShares[1], {from: accounts[1], value: investFunds[1].toString()});
  //   }).then(function(result) {
  //     // Check totalSupply
  //     return fund.totalSupply();
  //   }).then(function(result) {
  //     assert.strictEqual(result.toNumber(), wantedShares[0].add(wantedShares[1]).toNumber());
  //   }).then(function(result) {
  //     // Check sumInvested
  //     return fund.sumInvested();
  //   }).then(function(result) {
  //     // TODO: calculate sumInvested via Smart Contract
  //     assert.strictEqual(result.toNumber(), correctPriceToBePaid[0].add(correctPriceToBePaid[1]).toNumber());
  //   }).then(function(result) {
  //
  //     // ROUND 3 MANAGING
  //     return fund.buy(tokenUST.address, buyUST[0], {from: accounts[1]});
  //   }).then(function(result) {
  //     return UST.totalSupply()
  //   }).then(function(result) {
  //     console.log('Total Token Supply: ' + result.toNumber());
  //     console.log('Total Token Bought: ' + buyUST[0].dividedBy(priceGraph[0]).toNumber());
  //   }).then(function(result) {
  //     // Price changes
  //     return UST.setPrices(priceGraph[1], {from: accounts[0]});
  //   }).then(function(result) {
  //
  //     // ROUND 3
  //     return fund.createShares(wantedShares[2], {from: accounts[2], value: investFunds[2].toString()});
  //   }).then(function(result) {
  //     // Check totalSupply
  //     return fund.totalSupply();
  //   }).then(function(result) {
  //     // Paid to little, hence no shares received
  //     assert.strictEqual(result.toNumber(), wantedShares[0].add(wantedShares[1]).toNumber());
  //   }).then(function(result) {
  //     // Check sumInvested
  //     return fund.sumInvested();
  //   }).then(function(result) {
  //     // Paid to little, hence no investment made
  //     assert.strictEqual(result.toNumber(), correctPriceToBePaid[0].add(correctPriceToBePaid[1]).toNumber());
  //     // ROUND 4 Withdrawal
  //     return fund.annihilateShares(offeredShares[0], withdrawFunds[0], {from: accounts[0]});
  //   }).then(function(result) {
  //     // Check totalSupply
  //     return fund.totalSupply();
  //   }).then(function(result) {
  //     var balance = wantedShares[0].add(wantedShares[1]).minus(offeredShares[0]).toNumber();
  //     assert.strictEqual(result.toNumber(), balance);
  //   }).then(function(result) {
  //     // Check sumInvested
  //     return fund.sumWithdrawn();
  //   }).then(function(result) {
  //     // TODO: calculate outside w commission etc.
  //     console.log('Sold shares: ' + offeredShares[0]);
  //     console.log('Funds received: ' + result.toNumber());
  //     // assert.strictEqual(result.toNumber(), correctPriceToBeReceived[0].toNumber());
  //   }).then(function(result) {
  //     // ROUND 5
  //     return fund.annihilateShares(offeredShares[1], withdrawFunds[1], {from: accounts[1]});
  //   }).then(function(result) {
  //     // Check totalSupply
  //     return fund.totalSupply();
  //   }).then(function(result) {
  //     var balance = wantedShares[0].add(wantedShares[1]).minus(offeredShares[0]).minus(offeredShares[1]).toNumber();
  //     assert.strictEqual(result.toNumber(), balance);
  //   }).then(function(result) {
  //     // Check sumInvested
  //     return fund.sumWithdrawn();
  //   }).then(function(result) {
  //     // TODO: calculate outside w commission etc.
  //     console.log('Sold shares: ' + offeredShares[1]);
  //     console.log('Funds received (total): ' + result.toNumber());
  //     // assert.strictEqual(result.toNumber(), correctPriceToBeReceived[0].add(correctPriceToBeReceived[1]).toNumber());
  //   }).then(function(result) {
  //     // TODO: calculate outside w commission, performance gains, loses etc.
  //     // for (i = 0; i < numAccounts; ++i) {
  //     //   // Actual Balance
  //     //   var balance = web3.eth.getBalance(web3.eth.accounts[i],'ether');
  //     //   // >=, since actual balance has a gas cost for sending the tx.
  //     //   // TODO: Estimate Gas cost
  //     //   console.log(' Gas cost of Account ' + i + ':', balances[i].minus(balance).dividedBy('10e+18').toString());
  //     //   assert.isTrue(balances[i].greaterThanOrEqualTo(balance), "One of the Accounts has wrong balance!")
  //     // };
  //
  //     // fund({value: "1"});
  //   }).then(done).catch(done);
  // });

});
