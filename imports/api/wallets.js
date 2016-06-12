import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Wallets = new Mongo.Collection("wallets");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('wallets', function walletsPublication() {
    return Wallets.find({ owner: this.userId });
  });
}

Meteor.methods({
  'wallets.insert'(address, randomSeed) {
    check(address, String);
    check(randomSeed, String);

    // Make sure the user is loggin in before inserting
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Wallets.insert({
      address: address,
      balance: 0,
      nonce: 0,
      seed: randomSeed,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'wallets.update'(walletId, balance, nonce) {
    check(walletId, String);
    check(balance, Number);
    check(nonce, Number);

    const doc = Wallets.findOne(walletId);
    if (doc.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Wallets.update(walletId, { $set: { balance: balance, nonce: nonce } });
  },
  'wallets.setChecked'(walletId, setChecked) {
    check(walletId, String);
    check(setChecked, Boolean);

    const wallet = Wallets.findOne(walletId);
    if (wallet.private && wallet.owner !== Meteor.userId()) {
      // If the wallet is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Wallets.update(walletId, { $set: { checked: setChecked } });
  },
  'wallets.setPrivate'(walletId, setToPrivate) {
    check(walletId, String);
    check(setToPrivate, Boolean);

    const wallet = Wallets.findOne(walletId);

    // Make sure only the wallet owner can make a wallet private
    if (wallet.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Wallets.update(walletId, { $set: { private: setToPrivate } });
  }
});
