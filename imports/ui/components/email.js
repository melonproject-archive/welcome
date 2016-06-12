import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './email.html';


Template.email.onRendered(function emailOnRendered() {
  var template = this;

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
    errorPlacement: function( error, element ) {
      this.$('.error-message').text( error[0].innerText );
    },
    success: function( error ) {
      $('.error-message').text( error[0].innerText );
    },
    submitHandler: function() {
      handleSubscriber({
        email: template.find("[name='emailAddress']").value,
        action: 'subscribe',
      });
    },
  });
});

Template.email.events({
  'submit form': function(event) {
    event.preventDefault();
  },
});
