import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Funds } from '../../../api/funds.js';

import BigNumber from 'bignumber.js';
import web3 from '../../../lib/ethereum/web3.js'
import Pudding from '../../../lib/pudding/pudding.js'
import keystoreInstance from '../../../lib/ethereum/keystore.js';
// Load Truffle file
import MetaCoin from '../../../truffle/tests/environments/development/contracts/MetaCoin.sol.js';

import './newfund.html';


// Solidity source code
var source = '' +
  '/// @title Fund Contract\n' +
  '/// @author Reto Trinkler <rt@hedge-suisse.com>\n' +
  '';

// Construct Multiply Contract Object and contract instance
var contractInstance;


Template.newfund.onRendered(function (){
  this.$('select').material_select();
});


Template.newfund.onCreated(function newfundOnCreated(){
  this.state = new ReactiveDict();
  this.state.set({isInactive: true});
  Meteor.subscribe('funds');
});


Template.newfund.helpers({
  funds() {
    return Funds.find({}, { sort: {createdAt: -1 } });
  },
  isError() {
    return  Template.instance().state.get('isError');
  },
  isMining() {
    return  Template.instance().state.get('isMining');
  },
  isMined() {
    return  Template.instance().state.get('isMined');
  },
  address() {
    return  Template.instance().state.get('address');
  },
  isCreated() {
    return  Template.instance().state.get('isCreated');
  },
  isInactive() {
    return  Template.instance().state.get('isInactive');
  },
  source() {
    return source;
  },
});

// Template events
Template.newfund.events({
  'submit .new-fund'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Init Reactive Dict
    const reactiveState = Template.instance().state;

    // Get value from form element
    const target = event.target;
    const fund_name = target.fund_name.value;
    if (!fund_name) {
      console.log('empty string');
      //do something
    }
    // Clear form
    target.fund_name.value = '';

    // Create new Contract
    MetaCoin.load(Pudding);

    reactiveState.set({ isInactive: false, isMining: true });

    const fromAddr = keystoreInstance.currentAddress();
    const gasPrice = 100000000000;
    const gas = 2500000;

    MetaCoin.new({from: fromAddr, gasPrice: gasPrice, gas: gas}).then(function(result, err) {
      if(err) {
        console.log(err);
        reactiveState.set({isMining: false, isError: true, error: String(err)});
      }
      if(result.address) {
        reactiveState.set({isMining: false, isMined: true, address: result.address, source: source});
        // Insert a fund into the Collection
        const notional = 0,
          intraday = 1.0,
          mtd = 1.0,
          ytd = 1.0;
        Meteor.call('funds.insert', result.address, fromAddr, fund_name, notional, intraday, mtd, ytd);
      }
    });
  },
});
