import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './fund.html';


Template.fund.helpers({
	isOwner() {
		return this.owner === Meteor.userId();
	},
});

Template.fund.events({
	'click .toogle-checked'() {
		// Set the checked property to the opposite of its current value
		Meteor.call('funds.setChecked', this._id, !this.checked);
	},
	'click .delete'() {
		Meteor.call('funds.remove', this._id);
	},
	'click .toogle-private'() {
		Meteor.call('funds.setPrivate', this._id, !this.private)
	},
});
