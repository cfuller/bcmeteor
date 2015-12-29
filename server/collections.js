Tokens = new Meteor.Collection('tokens');

var videoStore = new FS.Store.Dropbox("files", {
  key: process.env.DROPBOX_KEY,
  secret: process.env.DROPBOX_SECRET,
  token: process.env.DROPBOX_TOKEN,
  folder: "BCTesting"
});

VideoFiles = new FS.Collection("videos", {
  stores: [videoStore]
});

VideoFiles.allow({
  insert: function (userId, doc) {
    if (Meteor.users.find({_id: userId}).count() > 0) {
      return true;
    }
  },
  update: function (userId, doc) {
    if (Meteor.users.find({_id: userId}).count() > 0) {
      return true;
    }
  },
  download: function () {
    return true;
  },
  fetch: null
});

VideoFiles.on('uploaded', function (fileObj) {
  VideoFiles.find({_id : fileObj._id}).observe({
    changed: function (file, oldFile) {
      if (file.url() !== null) {
        console.log(file.copies.files.key);
        var link = Meteor.call('getDropboxLink', file.copies.files.key);
        console.log(file.bc_id);
        console.log(link);
        var opts = {master: {url: link}};
        Meteor.call('ingestBrightcoveVideo', file.bc_id, opts);
      }
    }
  });
});

LogMessages = new Meteor.Collection('log');

/**
 PUBS
**/

Meteor.publish('log', function() {
  return LogMessages.find();
});