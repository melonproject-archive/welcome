import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import web3 from '../../lib/ethereum/web3.js'

import './setup.html';


Template.pages_setup.rendered = function() {
  this.state = new ReactiveDict();
  const instance = Template.instance();
  instance.state.set('clicked', false);
};

Template.pages_setup.events({
  'click #setupClient'(event, instance) {
  try {
    // Get Ethereum Accounts
    web3.eth.getAccounts(function(err, accounts) {
      if (err) {
        sAlert.error('Ethereum Provider: ' + err);
        return TemplateVar.set(instance, 'state', {isError: true, error: 'Ethereum Provider: ' + err});
      }

      // Check if there are accounts
      if (accounts.length < 0) {
        sAlert.info("Your Ethereum provider must have accounts'");
        return TemplateVar.set(instance, 'state', {isError: true, error: 'Your Ethereum provider must have accounts'});
      }
      // Success
      sAlert.success("Congratulations! You're now connected to the blockchain.");
    });
  } catch(err) {
    sAlert.error('Ethereum Provider: ' + err);
    return TemplateVar.set(instance, 'state', {isError: true, error: err});
  }
  }
});
