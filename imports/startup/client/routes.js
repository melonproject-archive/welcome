import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/main.js';
import '../../ui/layouts/header.js';
import '../../ui/layouts/footer.js';
import '../../ui/pages/welcome.js';
import '../../ui/pages/about.js';
import '../../ui/pages/team.js';
import '../../ui/pages/faq.js';

// Default route
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

// Route for about
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

// Route for team
FlowRouter.route('/team', {
  name: 'team',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'team',
      footer: 'layout_footer',
    });
  },
});

// Route for faq
FlowRouter.route('/faq', {
  name: 'faq',
  action() {
    BlazeLayout.render('layout_main', {
      nav: 'layout_header',
      main: 'faq',
      footer: 'layout_footer',
    });
  },
});
