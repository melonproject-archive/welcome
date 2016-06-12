import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './faq.html';

Template.faq.onRendered(function faqOnRendered() {
  this.$('.scrollspy').scrollSpy();
});
