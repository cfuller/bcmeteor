Template.home.helpers({
  player: function() {
    $.getScript('//players.brightcove.net/4365621380001/6a6ca24b-7acf-4036-a73e-29f0fa50d3c5_default/index.min.js', function(data, status) {
      console.log(status);
      return data;
    });
    //return '<script src="//players.brightcove.net/4365621380001/6a6ca24b-7acf-4036-a73e-29f0fa50d3c5_default/index.min.js"></script>'
  }
});