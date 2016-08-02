import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './welcome.html';


Template.welcome.onRendered(function welcomeOnRendered() {
  this.$('.parallax').parallax();
});
