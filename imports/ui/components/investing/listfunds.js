import './listfunds.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Funds } from '../../../api/funds.js';

import './fund.js';


Template.components_listfunds.onCreated(function components_listfundsOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("funds");
})

Template.components_listfunds.helpers({
  funds() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter funds
      return Funds.find({}, { sort: {createdAt: -1 } });
    }
    // Otherwise, return all of the funds
    return Funds.find({}, { sort: {createdAt: -1 } });
  },
  fundCount() {
    return Funds.find({}).count();
  },
});

Template.components_listfunds.events({
  'submit .new-fund'(event) {
    // Prevent default browser form submit
    /*TODO: Firefox blocks this*/
    event.preventDefault();
    // event.originalEvent.defaultPrevented;

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a fund into the collection
    Meteor.call('funds.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
