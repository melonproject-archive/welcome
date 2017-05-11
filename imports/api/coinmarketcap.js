import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// Parse Contribution Contracts
let latestMarketCap;
function getMarketCap() {

}

/**
 * Startup code
 */
Meteor.startup(() => {
  // Meteor.setInterval(getMarketCap, 10003);
});


Meteor.methods({
  'latestMarketCap'() {
    return latestMarketCap;
  },
});
