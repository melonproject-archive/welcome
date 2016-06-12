import HookedWeb3Provider from 'hooked-web3-provider';

import web3 from './web3.js';

export default setWeb3Provider = (keystore) => {
  // Create a custom passwordProvider to prompt the user to enter their
  // password whenever the hooked web3 provider issues a sendTransaction
  // call.
  keystore.passwordProvider = function (callback) {
    const pw = prompt('Please enter your wallet password to approve the transaction.', 'password');
    callback(null, pw);
  };

  // Set Hooked Provider
  const web3Provider = new HookedWeb3Provider({
    host: 'http://146.185.133.245:8545',
    // host: 'http://localhost:8545',
    transaction_signer: keystore,
  });
  web3.setProvider(web3Provider);
};
