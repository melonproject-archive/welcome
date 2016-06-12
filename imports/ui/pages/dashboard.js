import './dashboard.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Wallets } from '../../api/wallets.js';

// Components used inside the template
import '../components/dashboard/performancefund.js';
import '../components/dashboard/performanceinvestment.js';
import '../components/dashboard/wallet.js';


Template.pages_dashboard.onRendered(function dashboardOnRendered() {
  this.$('.scrollspy').scrollSpy();
});


Template.pages_dashboard.onCreated(function dashboardOnCreated() {
  Meteor.subscribe('wallets');
});


Template.pages_dashboard.helpers({
  walletCount() {
    return Wallets.find({}).count();
  },
});
