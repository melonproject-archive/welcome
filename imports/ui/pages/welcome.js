import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './welcome.html';

// Components used inside the template
import '../components/email.js';


Template.welcome.onRendered(function welcomeOnRendered() {
  this.$('.parallax').parallax();
});
