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
