var settings = Meteor.settings.private.MailChimp,
    chimp    = new MailChimp( settings.apiKey, { version: '2.0' } ),
    listId   = settings.listId;

Meteor.methods({
  getSubscribers: function() {
    try {
      let subscribers = chimp.call('lists', 'members', {
        id: listId,
        status: 'subscribed',
      });

      subscribers = _.map(subscribers.data, function( subscriber ) {
        return { email: subscriber.email };
      });

      return subscribers;
    } catch (exception) {
      return exception;
    }
  },
  handleSubscriber: function( subscriber ) {
    check( subscriber, {
      email: String,
      action: String,
    });

    try {
      var subscribe = chimp.call('lists', subscriber.action, {
        id: listId,
        email: {
          email: subscriber.email,
        },
      });

      return subscribe;
    } catch (exception) {
      return exception;
    }
  },
});
