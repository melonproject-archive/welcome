import './performancefund.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { EthTools } from 'meteor/ethereum:tools';

import keystoreInstance from '../../../lib/ethereum/keystore.js';

import { Funds } from '../../../api/funds.js';
import { Wallets } from '../../../api/wallets.js';


Template.performancefund.onCreated(function performancefundOnCreated(){
  this.state = new ReactiveDict();
  Meteor.subscribe("funds");
});


Template.performancefund.helpers({
  funds() {
    return Funds.find({}, { sort: { createdAt: -1 } });
  },
  fundCount() {
    return Funds.find({}).count();
  },
  isOwner() {
    return this.owner === Meteor.userId();
  },
  displayBalance(balance) {
    return EthTools.formatBalance(balance.toString(10), '0,0.0[00] UNIT');
  },
});

// Template events
Template.performancefund.events({
  "click .btn-default"(event, template){
    // Wallet needs to be unlocked
    if (keystoreInstance.currentAddress() === false) {
      sAlert.info('Unlock a Webwallet first.');
      return;
    }
    Router.go('/newfund');
  },
});
