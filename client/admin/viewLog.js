Template.viewLog.helpers({
  messages: function() {
    Meteor.subscribe('log');
    return LogMessages.find({}, {sort: {time: -1}}).fetch();
  }
});