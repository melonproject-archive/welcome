import './performanceinvestment.html';

import { Investments } from '../../../api/investments.js';

Template.performanceinvestment.helpers({
  investmentCount() {
      return Investments.find({}).count();
  },
  isOwner() {
    return this.owner === Meteor.userId();
  },
  fromWei(weiValue, type) {
    return web3.fromWei(weiValue, type).toString(10);
  },
});


Template.performanceinvestment.events({
  'click .btn-default'(event, instance){
    Router.go('/investing');
  },
});
