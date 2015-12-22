Template.login.events({
  'submit #login-form': function(e, t) {
    e.preventDefault();
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'slide', position: 'top', timeout: 2000});
      }
      else {
        Router.go('admin');
      }
    })
  }
});