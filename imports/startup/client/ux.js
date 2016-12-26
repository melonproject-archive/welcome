import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


Meteor.startup(() => {
  Session.set('LearnSubPage', {
    Contribution: true,
    Protocol: false,
    Portal: false
  });
  Session.set('AboutSubPage', {
    Brief: true,
    Careers: false,
    Purpose: false
  });
});
