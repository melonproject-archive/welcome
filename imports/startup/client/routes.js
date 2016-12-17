import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '/imports/ui/layouts/main.js';
import '/imports/ui/layouts/header.js';
import '/imports/ui/layouts/footer.js';
import '/imports/ui/pages/welcome.js';
import '/imports/ui/pages/about.js';
import '/imports/ui/pages/learn.js';

FlowRouter.route('/', {
  name: 'welcome',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'welcome',
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
