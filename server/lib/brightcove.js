Meteor.methods({
  getBrightcoveToken: function() {
    var token = Tokens.findOne({name: 'brightcove_token'});
    if (typeof token == 'undefined') {
      //We don't have a token so get one
      token = Meteor.call('authBrightcove');
    }
    else if(moment().isAfter(token.expires, 'seconds')) {
      console.log('expired');
      token = Meteor.call('authBrightcove');
    }
    return token.token;
  },
  authBrightcove: function() {
    var options = {
      auth: process.env.BC_CLIENT_ID + ':' + process.env.BC_CLIENT_SECRET,
      content: 'grant_type=client_credentials',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };
    var response = HTTP.call('POST', 'https://oauth.brightcove.com/v3/access_token', options);
    if (response.statusCode == 200) {
      //Insert token into collection
      var content = EJSON.parse(response.content);
      content.expires = moment().add(content.expires_in, 'seconds').format();
      Tokens.remove({name: 'brightcove_token'});
      Tokens.insert({name: 'brightcove_token', token: content.access_token, expires: content.expires});
      content.token = content.access_token;
      return content;
    }
    else {
      throw new Meteor.Error('brightcove-token', 'Unable to obtain Brightcove token.')
    }
  },
  getBrightcoveVideos: function(opts) {
    var url = 'https://cms.api.brightcove.com/v1/accounts/' + process.env.BC_ACCOUNT_ID + '/videos?limit=100';
    var token = Meteor.call('getBrightcoveToken');
    var options = {
      headers: {'Authorization': 'Bearer ' + token}
    };
    var videos = HTTP.call('GET', url, options);
    return videos;
  },
  createBrightcoveVideo: function(opts) {
    var url = 'https://cms.api.brightcove.com/v1/accounts/' + process.env.BC_ACCOUNT_ID + '/videos';
    var token = Meteor.call('getBrightcoveToken');
    var options = {
      headers: {'Authorization': 'Bearer ' + token},
      data: opts
    };

    var response = HTTP.call('POST', url, options);
    return response.content;
  },
  ingestBrightcoveVideo: function(vid, opts) {
    var url = 'https://ingest.api.brightcove.com/v1/accounts/' + process.env.BC_ACCOUNT_ID + '/videos/' + vid + '/ingest-requests';
    var token = Meteor.call('getBrightcoveToken');
    var options = {
      headers: {'Authorization': 'Bearer ' + token},
      data: opts
    };
    var response = HTTP.call('POST', url, options);
    console.log(response.content);
  },
  deleteBrightcoveVideo: function(vid) {
    var url = 'https://cms.api.brightcove.com/v1/accounts/' + process.env.BC_ACCOUNT_ID + '/videos/' + vid;
    var token = Meteor.call('getBrightcoveToken');
    var options = {
      headers: {'Authorization': 'Bearer ' + token}
    };
    var response = HTTP.call('DELETE', url, options);
    return response.content;
  }
});