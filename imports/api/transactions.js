import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Transactions = new Mongo.Collection("transactions");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({ owner: this.userId });
  });
}

Meteor.methods({
  'transactions.insert'(address, randomSeed) {
    check(address, String);
    check(randomSeed, String);

    // Make sure the user is loggin in before inserting
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Transactions.insert({
      address: address,
      balance: 0,
      nonce: 0,
      seed: randomSeed,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'transactions.update'(walletId, balance, nonce) {
    check(walletId, String);
    check(balance, Number);
    check(nonce, Number);

    const doc = Transactions.findOne(walletId);
    if (doc.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Transactions.update(walletId, { $set: { balance: balance, nonce: nonce } });
  },
});
