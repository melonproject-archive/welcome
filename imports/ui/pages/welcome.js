import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { MailChimp } from 'meteor/miro:mailchimp';

import './welcome.html';

Template.welcome.onRendered(function welcomeOnRendered() {
  this.$('.parallax').parallax();

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

Template.welcome.events({
  'submit form': function( event ) {
    event.preventDefault();
  },
});

// Methods used
handleSubscriber = function(subscriber) {
  Meteor.call( 'handleSubscriber', subscriber, function( error, response ) {
    if (error) {
      Materialize.toast(error.reason, 8000, 'orange') // 4000 is the duration of the toast
    } else {
      if ( response.complete || response.euid ) {
        var subscribeMessage   = 'Please confirm your email to complete your subscription!',
            unsubscribeMessage = subscriber.email + ' successfully unsubscribed!',
            message            = subscriber.action === 'subscribe' ? subscribeMessage : unsubscribeMessage;

        Materialize.toast(message, 8000, 'green') // 4000 is the duration of the toast

        if (template) {
          template.getSubscribers();
        }
      } else {
        Materialize.toast(response.message, 8000, 'orange') // 4000 is the duration of the toast
      }
    }
  });
};
