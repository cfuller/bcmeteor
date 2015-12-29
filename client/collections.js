Tokens = new Meteor.Collection('tokens');

var videoStore = new FS.Store.Dropbox("files");

VideoFiles = new FS.Collection("videos", {
  stores: [videoStore]
});

VideoFiles.allow({
  download: function () {
    return true;
  },
  fetch: null
});

LogMessages = new Meteor.Collection('log');