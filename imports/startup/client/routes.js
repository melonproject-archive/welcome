import { Router } from 'meteor/iron:router';

// Import to load these templates
import '../../ui/layouts/main.js';
import '../../ui/pages/welcome.js';
import '../../ui/pages/timeline.js';
import '../../ui/pages/faq.js';

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


// Default route
Router.route('/', {
  template: 'welcome',
  name: 'home'
});

// Route for timeline
Router.route('/timeline', {
  template: 'timeline',
  name: 'timeline'
});

// Route for faq
Router.route('/faq', {
  template: 'faq',
  name: 'faq'
});
