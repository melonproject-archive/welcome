import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Funds = new Mongo.Collection('funds');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('funds', function fundsPublication() {
    return Funds.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'funds.insert'(fundAddress, ownerAddress, fundName, notional, intraday, mtd, ytd) {
    check(fundAddress, String);
    check(ownerAddress, String);
    check(fundName, String);
    check(notional, Number);
    check(intraday, Number);
    check(mtd, Number);
    check(ytd, Number);

    // Make sure the user is loggin in before inserting
    if (! Meteor.userId())
        throw new Meteor.Error('not-authorized');

    Funds.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      fundAddress,
      ownerAddress,
      fundName,
      notional,
      intraday,
      mtd,
      ytd,
      createdAt: new Date(),
    });
  },
  'funds.remove'(fundId) {
    check(fundId, String);

    const fund = Funds.findOne(fundId);

    // Only the owner can delete it
    if (fund.owner !== Meteor.userId())
        throw new Meteor.Error('not-authorized');

    Funds.remove(fundId);
  },
  'funds.setChecked'(fundId, setChecked) {
    check(fundId, String);
    check(setChecked, Boolean);

    const fund = Funds.findOne(fundId);
    if (fund.private && fund.owner !== Meteor.userId()) {
      // If the fund is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Funds.update(fundId, { $set: { checked: setChecked } });
  },
  'funds.setPrivate'(walletId, setToPrivate) {
    check(walletId, String);
    check(setToPrivate, Boolean);

    const wallet = Funds.findOne(walletId);

    // Make sure only the wallet owner can make a wallet private
    if (wallet.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Funds.update(walletId, { $set: { private: setToPrivate } });
  }
});
