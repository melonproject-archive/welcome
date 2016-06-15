import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './team.html';

Template.team.onRendered(function teamOnRendered() {
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
