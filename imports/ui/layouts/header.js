import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';
import { $ } from 'meteor/jquery';
import { MailChimp } from 'meteor/miro:mailchimp';

import './header.html';


Template.layout_header.onRendered(function headerOnRendered() {
  this.$('.button-collapse').sideNav({});

  const template = this;
  this.$('#mailing-list').validate({
    rules: {
      emailAddress: {
        email: true,
        required: true,
      },
    },
    messages: {
      emailAddress: {
        email: 'Please use a valid email address!',
        required: 'An email address is required.',
      },
    },
    errorPlacement(error) {
      $('.error-message').text(error[0].innerText);
    },
    success(error) {
      $('.error-message').text(error[0].innerText);
    },
    submitHandler() {
      handleSubscriber({
        email: template.find('[name="emailAddress"]').value,
        action: 'subscribe',
      });
    },
  });
});

Template.layout_header.helpers({
  username() {
    return Meteor.user().username;
  },
});

Template.layout_header.events({
  'click .logout'() {
    Meteor.logout();
    Router.go('/sign-in');
  },
  'click .dropdown-button'() {
    Template.instance().$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
    });
  },
});
