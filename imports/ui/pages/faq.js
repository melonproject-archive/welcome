import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './faq.html';

Template.faq.onRendered(function faqOnRendered() {
  this.$('.tabs-wrapper').pushpin({
    top: this.$('.tabs-wrapper').offset().top,
  });
  this.$('.scrollspy').scrollSpy();
  this.$('.collapsible').collapsible({
    accordion: false,
  });
});
