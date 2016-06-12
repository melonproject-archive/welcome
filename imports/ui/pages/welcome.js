import { Template } from 'meteor/templating';

import './welcome.html';

// Components used inside the template
import '../components/email.js';

Template.pages_welcome.onRendered(function welcomeOnRendered() {
  this.$('.parallax').parallax();
});
