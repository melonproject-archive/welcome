import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import lightwallet from 'eth-lightwallet';

import setWeb3Provider from './setWeb3Provider.js';

import { Wallets } from '../../api/wallets.js';


// Class to be exported
class Lightwallet {
  constructor() {
    this.keystore = new lightwallet.keystore();
  }
  clear() {
    this.keystore = new lightwallet.keystore();
  }
  currentAddress() {
    let addresses = this.keystore.getAddresses();
    if (addresses.length !== 0)
      return '0x' + addresses[addresses.length - 1];
    return false;
  }
  refreshAllWallets() {
    // Update Wallets
    let docs = Wallets.find({}, { sort: { createdAt: -1 } }).fetch();
    for (doc of docs) {
      let walletId = doc._id;
      let address = doc.address;
      let balance = web3.eth.getBalance(address).toNumber();
      let nonce = web3.eth.getTransactionCount(address);

      // Update a wallet into the collection
      Meteor.call('wallets.update', walletId, balance, nonce);
    }
    // Notification
    Materialize.toast('Wallets refreshed', 4000);
  }
  watchBalance() {
    if (this.currentAddress() === false) {
      return false;
    }

    // Wallet document
    const address = this.currentAddress();
    const doc = Wallets.findOne({ address: address }, { sort: { createdAt: -1 } });
    let walletId = doc._id;
    let currBalance = web3.eth.getBalance(address).toNumber();
    let currNonce = web3.eth.getTransactionCount(address);

    // Update Wallet document
    var filter = web3.eth.filter('latest').watch(function() {
      let balance = web3.eth.getBalance(address).toNumber();
      let nonce = web3.eth.getTransactionCount(address);
      sAlert.info('New Block has been mined');
      // Check if Balance or Nonce has changed
      if (currBalance !== balance || currNonce !== nonce) {
        if (currBalance === 0)
          sAlert.success('Account has been funded');
        else
          sAlert.warning('Balance has changed');
        // Uninstall Filter
        filter.stopWatching();
        // Update current values
        currBalance = balance;
        currNonce = nonce;
        // Update a wallet into the collection
        Meteor.call('wallets.update', walletId, balance, nonce);
      }
    });
    return true;
  }
  create(randomSeed, password, pwDerivedKey) {
    this.keystore = new lightwallet.keystore(randomSeed, pwDerivedKey);

    // generate one new address/private key pairs
    // the corresponding private keys are also encrypted
    this.keystore.generateNewAddress(pwDerivedKey);

    // Insert into Collection
    let address = '0x' + this.keystore.getAddresses();

    // Insert a wallet into the collection
    Meteor.call('wallets.insert', address, randomSeed);

    // Fund Latest Wallet
    let url = 'http://icarus.parity.io/rain/' + address;

    // Call Gavin Woods Parity Party
    HTTP.call('GET', url, function (error, result) {
      if (!error) {
        console.log(result);
      }
    });

    // Now set keystore as transaction_signer in the hooked web3 provider
    // and you can start using web3 using the keys/addresses in keystore!
    // Set Hooked Provider
    setWeb3Provider(this.keystore);
  }
  import(secretSeed, pwDerivedKey) {
    this.keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);

    // generate one new address/private key pairs
    // the corresponding private keys are also encrypted
    this.keystore.generateNewAddress(pwDerivedKey);

    // Now set keystore as transaction_signer in the hooked web3 provider
    // and you can start using web3 using the keys/addresses in keystore!
    // Set Hooked Provider
    setWeb3Provider(this.keystore);
  }
  export(pwDerivedKey) {
    if (this.currentAddress() === false)
      return false
    else
      return this.keystore.getSeed(pwDerivedKey);
  }
};

export default keystoreInstance = new Lightwallet();
