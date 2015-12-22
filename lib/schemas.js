Schema = {};
Schema.video = new SimpleSchema({
  name: {
    type: String,
    label: "Video Title",
    max: 255
  },
  description: {
    type: String,
    label: 'Description',
    max: 2500
  },
  videoId: {
    type: String
  }
});