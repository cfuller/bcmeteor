Template.videoModal.helpers({
  vid: function() {
    return Template.instance().vid.get();
  },
  video: function() {
    var vid = Template.instance().vid.get();
    return '<iframe src="//players.brightcove.net/4365621380001/default_default/index.html?videoId='+vid+'" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
  }
});

Template.videoModal.events({
  'open.fndtn.reveal [data-reveal]': function(e, t) {
    Template.instance().vid.set(Session.get('clickedVideo'));
  }
});

Template.videoModal.onCreated(function() {
  var self = this;
  self.vid = new ReactiveVar(Session.get('clickedVideo'));
});