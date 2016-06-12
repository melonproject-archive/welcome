import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../ui/layouts/main.js';
import '../../ui/pages/welcome.js';

import '../../ui/pages/dashboard.js';
import '../../ui/pages/strategy.js';

import '../../ui/pages/investing.js';
import '../../ui/pages/newfund.js';
import '../../ui/pages/detailfund.js';

import '../../ui/pages/trading.js';

import '../../ui/pages/wallet.js';
import '../../ui/pages/setup.js';


import { Funds } from '../../api/funds.js';

// Router defaults
Router.configure({
  layoutTemplate: 'layout_main',
  notFoundTemplate: 'layout_notFound',
  yieldRegions: {
    'layout_header': {to: 'header'}
    , 'layout_footer': {to: 'footer'}
  }
});

//Routes for accounts template
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

Router.plugin('ensureSignedIn', {
  except: _.pluck(AccountsTemplates.routes, 'name').concat(['home', 'investing'])
});

// Default route
Router.route('/', {
  template: 'pages_welcome',
  name: 'home'
});

// Route for dashboard
Router.route('/dashboard', {
  template: 'pages_dashboard',
  name: 'dashboard'
});

// Route for strategy
Router.route('/strategy', {
  template: 'pages_strategy',
  name: 'strategy'
});

// Route for investing
Router.route('/investing', {
  template: 'pages_investing',
  name: 'investing'
});

// Route for specific fund
Router.route('/fund/:_id', {
    template: 'pages_detailfund',
    name: 'detailfund',
    data: function(){
        var currentFund = this.params._id;
        return Funds.findOne({ _id: currentFund });
    }
});


// Route for trading
Router.route('/trading', {
    template: 'pages_trading',
    name: 'trading'
});

// Route for newfund
Router.route('/newfund', {
  template: 'pages_newfund',
  name: 'newfund'
});

// Route for accounts
Router.route('/accounts', {
    template: 'pages_accounts',
    name: 'accounts'
});

// Route for wallet
Router.route('/wallet', {
    template: 'pagesWebWallet',
    name: 'wallet'
});

// Route for setup up connection
Router.route('/setup', {
  template: 'pages_setup',
  name: 'setup'
});
