Template.admin.onCreated(function() {
  var self = this;
  self.videos = new ReactiveVar('Waiting...');
  Meteor.call('getAllVideos', function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      self.videos.set(result.data);
    }
  });
});

Template.admin.helpers({
  videos: function() {
    var videos = Template.instance().videos.get();
    if (typeof videos == 'object') {
      var arr = $.map(videos, function(el) { return el; });
      return arr;
    }
  },
  tableSettings: function() {
    return {
      filters: ['videoFilter'],
      fields: [
        {key: 'thumbnail', label: '',
          fn: function(value, object) {
            if (typeof(object.images.thumbnail) != 'undefined') {
              return new Spacebars.SafeString('<a href="#" class="js-player-modal" data-vid="' + object.id + '" data-reveal-id="videoModal"><img src="' + object.images.thumbnail.src + '" /></a>')
            }
          }
        },
        {key: 'name', label: 'Title'},
        {key: 'description', label: 'Description'},
        {key: 'created_at', label: 'Created', fn: function(value, object) {return moment(value).format('YYYY-MM-D H:mm A')}},
        {key: 'updated_at', label: 'Last Updated', fn: function(value, object) {return moment(value).format('YYYY-MM-D H:m A')}},
        {key: 'state', label: 'Status'},
        {key: 'actions', label: 'Actions', fn: function(value, object) {
          return new Spacebars.SafeString('<a href="#" class="js-delete-video" data-vid="' + object.id + '">Delete</a>');
        }}
      ]
    }
  }
});

Template.admin.events({
  'click .js-player-modal': function(e, t) {
    e.preventDefault();
    Session.set('clickedVideo', '');
    Session.set('clickedVideo', ($(e.currentTarget).attr('data-vid')));
  },
  'click .js-delete-video': function(e, t) {
    e.preventDefault();
    console.log($(e.currentTarget).attr('data-vid'));
    Meteor.call('deleteBrightcoveVideo', $(e.currentTarget).attr('data-vid'), function() {
      console.log('Deleted video');
    })
  }
});