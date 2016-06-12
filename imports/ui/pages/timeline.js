import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './timeline.html';

Template.timeline.onRendered(function timelineOnRendered() {
  this.$('.parallax').parallax();
  this.$('.materialboxed').materialbox();
});
