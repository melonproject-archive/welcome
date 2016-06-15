import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './about.html';

Template.about.onRendered(function aboutOnRendered() {
  this.$('.tabs-wrapper').pushpin({
    top: this.$('.tabs-wrapper').offset().top,
  });
  this.$('.scrollspy').scrollSpy();
  this.$('.materialboxed').materialbox();
  this.$('.slider').slider({
    full_width: true,
    dist: 0,
  });
});
