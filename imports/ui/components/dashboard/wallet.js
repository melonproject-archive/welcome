import './wallet.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { EthTools } from 'meteor/ethereum:tools';

import lightwallet from 'eth-lightwallet';
import web3 from '../../../lib/ethereum/web3.js';
import keystoreInstance from '../../../lib/ethereum/keystore.js';

import { Wallets } from '../../../api/wallets.js';


Template.wallet.onRendered(function walletOnRendered() {
  // this.$('#modal1').openModal();
  this.$('.modal-trigger').leanModal({
    dismissible: false,
    opacity: 0.5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    // ready: function() { alert('Ready'); }, // Callback for Modal open
    // complete: function() { alert('Closed'); } // Callback for Modal close
  });

  if (keystoreInstance.currentAddress() === false) {
    this.state.set({ isUnlocked: false });
  } else {
    this.state.set({ isUnlocked: true });
  }
});


Template.wallet.onCreated(function walletOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('wallets');
});

Template.wallet.helpers({
  wallets() {
    return Wallets.find({}, { sort: { createdAt: -1 } }).fetch();
  },
  walletCount() {
    return Wallets.find({}).count();
  },
  isUnlocked(address) {
    // Check Reactive State and Keystore State
    if (Template.instance().state.get('isUnlocked') === address ||
        keystoreInstance.currentAddress() === address) {
      return true;
    }
    return false;
  },
  totalBalance() {
    let sum = 0.0;
    const docs = Wallets.find({}, { sort: { createdAt: -1 } }).fetch();
    let doc;
    for (doc of docs) {
      sum += parseInt(doc.balance, 10);
    }

    return EthTools.formatBalance(sum.toString(10), '0,0.0[00] UNIT');
  },
  fromWei(weiValue, type) {
    return web3.fromWei(weiValue, type).toString(10);
  },
  displayBalance(balance) {
    return EthTools.formatBalance(balance.toString(10), '0,0.0[00] UNIT');
  },
});


Template.wallet.events({
  'click .new-wallet'(event, instance) {

    // Prevent default browser form submit
    event.preventDefault();

    // Init Reactive Dict
    const reactiveState = Template.instance().state;

    // Get value from form element
    // const target = event.target;
    // const extraEntropy = target.userEntropy.value;
    // target.userEntropy.value = '';
    const extraEntropy = '';

    // Create a random Seed
    const randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);
    const infoString = 'Your new wallet seed is: "' + randomSeed +
      '". Please write it down on paper or in a password manager, ' +
      'you will need it to access your wallet. Do not let anyone see ' +
      'this seed or they can take your Ether. ' +
      'Please enter a password to encrypt your seed while in the browser.';
    console.log('Random seed is: ' + randomSeed);

    // Create new Address
    const password = prompt(infoString, 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      keystoreInstance.create(randomSeed, password, pwDerivedKey);

      sAlert.success("Congratulations, you created a new wallet.");
      sAlert.info("Please wait while your wallet is being funded.", {timeout: 60000});

      // Watch Balance
      keystoreInstance.watchBalance();

      // Set Reactive Dict isUnlocked state to address
      const addresses = keystoreInstance.keystore.getAddresses();
      const unlockedAddress = '0x${addresses[addresses.length - 1]}';
      console.log(unlockedAddress);
      reactiveState.set({ isUnlocked: unlockedAddress });
    });
  },
  'click .refresh-wallets'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Refresh all wallets
    keystoreInstance.refreshAllWallets();
  },
  'click .manage-wallets'() {
    Router.go('/wallet');
  },
  'click .unlock'() {
    // Init Reactive Dict
    const reactiveState = Template.instance().state;

    // If unlocked - lock it
    if (reactiveState.get('isUnlocked') !== false) {
      keystoreInstance.clear();
      reactiveState.set({ isUnlocked: false });
      return;
    }

    const seed = this.seed;
    const address = this.address;

    let password = prompt('Enter Password to encrypt your seed', 'password');
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      keystoreInstance.import(seed, pwDerivedKey);

      // Set Reactive Dict isUnlocked state to address
      let addresses = keystoreInstance.keystore.getAddresses();
      let unlockedAddress = '0x' + addresses[addresses.length - 1];
      // Error checking
      /*TODO: implement w/o prompt*/
      if (address !== unlockedAddress)
        prompt('ERROR');
      reactiveState.set({isUnlocked: unlockedAddress});
    });
  },
});
