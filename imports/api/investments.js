import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Investments = new Mongo.Collection('investments');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('investments', function investmentsPublication() {
    return Investments.find({ owner: this.userId });
  });
}

Meteor.methods({
  'investments.insert'(address, randomSeed) {
    check(address, String);
    check(randomSeed, String);

    // Make sure the user is loggin in before inserting
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Investments.insert({
      address: address,
      balance: 0,
      nonce: 0,
      seed: randomSeed,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'investments.update'(walletId, balance, nonce) {
    check(walletId, String);
    check(balance, Number);
    check(nonce, Number);

    const doc = Investments.findOne(walletId);
    if (doc.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Investments.update(walletId, { $set: { balance: balance, nonce: nonce } });
  },
});
