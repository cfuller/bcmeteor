Meteor.methods({
  getAllVideos: function() {
    var options = {type: 'all', query: ''};
    var videos = Meteor.call('getBrightcoveVideos', options);
    return videos;
  },
  postVideo: function(doc) {
    try {
      check(doc, Schema.video);
    }
    catch(e) {
      throw new Meteor.Error(e);
    }
    doc.updated_date = moment().format();
    doc.author = Meteor.userId();
    console.log(doc);
    var video = {
      name: doc.name,
      description: doc.description,
      reference_id: doc.videoId,
      state: 'INACTIVE'
    };
    var response = Meteor.call('createBrightcoveVideo', video);
    response = EJSON.parse(response);
    var vidFile = VideoFiles.findOne(response.reference_id);
    //update video file, insert response.id
    VideoFiles.update(response.reference_id, {bc_id: response.id});
  },
  getDropboxLink: function(key) {
    var path = 'BCTesting/' + key;
    var options = {
      headers: {'Authorization': 'Bearer ' + process.env.DROPBOX_TOKEN}
    };
    var obj = HTTP.call('POST', 'https://api.dropboxapi.com/1/shares/auto/' + path + '?short_url=false', options);
    console.log(obj);
    console.log(obj.data.url);
    var url = obj.data.url.replace('https://www.dropbox.com/', 'https://dl.dropboxusercontent.com/')
    return url;
  }
});