import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '/imports/ui/layouts/main.js';
import '/imports/ui/layouts/header.js';
import '/imports/ui/layouts/footer.js';
import '/imports/ui/pages/landing.js';
import '/imports/ui/pages/about.js';
import '/imports/ui/pages/learn.js';

FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'landing',
      footer: 'layout_footer',
    });
  },
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'about',
      footer: 'layout_footer',
    });
  },
});

// Redirect /team to about page for goole search results
FlowRouter.route('/team', {
  name: 'about',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'about',
      footer: 'layout_footer',
    });
  },
});

FlowRouter.route('/learn', {
  name: 'learn',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'learn',
      footer: 'layout_footer',
    });
  },
});
