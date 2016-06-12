import './wallet.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import BigNumber from 'bignumber.js';
import HookedWeb3Provider from 'hooked-web3-provider';
import lightwallet from 'eth-lightwallet';
import keystoreInstance from '../../lib/ethereum/keystore.js';

import { Wallets } from '../../api/wallets.js';


Template.pagesWebWallet.onCreated(function walletOnCreated() {
  this.state = new ReactiveDict();
  this.state.set({ isInactive: true });
});


Template.pagesWebWallet.helpers({
  settings() {
    return {
      // collection: Wallets.find({ balance: "1" }, { sort: { createdAt: -1 } }).fetch(),
      collection: Wallets.find({}, { sort: { createdAt: -1 } }).fetch(),
      showFilter: false,
      showRowCount: false,
      showNavigation: 'never',
      showNavigationRowsPerPage: false,
      fields: ['username', 'owner', 'address', 'balance', 'nonce'],
    };
  },
});


Template.pagesWebWallet.events({
  'submit .new-wallet'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const extraEntropy = target.userEntropy.value;
    target.userEntropy.value = '';

    // Create a random Seed
    let randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);
    let infoString = 'Your new wallet seed is: "' + randomSeed +
      '". Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether. ' +
      'Please enter a password to encrypt your seed while in the browser.';
    console.log('Random seed is: ' + randomSeed);

    // Create new Address
    let password = prompt(infoString, 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      keystoreInstance.create(randomSeed, password, pwDerivedKey);
    });
  },
  'submit .import-seed'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const setSeed = target.seed.value;
    target.seed.value = '';

    let password = prompt('Enter Password to encrypt your seed', 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      keystoreInstance.import(seed, pwDerivedKey);
    });
  },
  'submit .export-seed'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    if (keystoreInstance.currentAddress() === false)
      return;

    let password = prompt('Enter password to show your seed. Do not let anyone else see your seed.', 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      let seed = keystoreInstance.export(pwDerivedKey);
      // Set value to form element
      const target = event.target;
      target.userSeed.value = seed;
    });
  },
  'submit .send-ether'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // the seed is stored encrypted by a user-defined password
    var password = prompt('Enter password for encryption', 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
      // Send
      let fromAddr = ks.getAddresses();
      let toAddr = '0xa1273a9295d942c2d3e63f17644a3efa9873c5cb';


      let valueEth = 1;
      let value = 50000000000;
      let gasPrice = 100000000000;
      let gas = 50000;
      console.log('Web3' + web3);
      web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas}, function (err, txhash) {
        if (err)
          console.log('error: ' + err);
        else
          console.log('txhash: ' + txhash);
      });

    });
  },
});
