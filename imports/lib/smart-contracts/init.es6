// import BigNumber from 'bignumber.js';
// import web3 from '../ethereum/web3.js';
var BigNumber = require('bignumber.js');

function checkBalance(balanceReq, numAccounts) {
  var balances = [];
  it('Check that first three accounts have enough balance', () => {
    // Iterate over first numAccounts accounts
    for (i = 0; i < numAccounts; ++i) {
      var balance = web3.eth.getBalance(web3.eth.accounts[i],'ether');
      balances[i] = balance;
      assert.isTrue(balances[i].greaterThan(balanceReq), 'One of the Accounts not funded enough');
    };
  });
  return balances;
};
//
//
// checkBalance = (balanceReq, numAccounts) => {
//   // Create a custom passwordProvider to prompt the user to enter their
//   // password whenever the hooked web3 provider issues a sendTransaction
//   // call.
//   keystore.passwordProvider = function (callback) {
//     const pw = prompt('Please enter your wallet password to approve the transaction.', 'password');
//     callback(null, pw);
//   };
//
//   // Set Hooked Provider
//   const web3Provider = new HookedWeb3Provider({
//     host: 'http://146.185.133.245:8545',
//     // host: 'http://localhost:8545',
//     transaction_signer: keystore,
//   });
//   web3.setProvider(web3Provider);
// };
