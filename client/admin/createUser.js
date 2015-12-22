Template.createUser.events({
  'submit #registration-form': function(e, t) {
    e.preventDefault();
    var data = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
      email: $("input[name='email']").val(),
      profile: {
        first_name: $("input[name='first_name']").val(),
        last_name: $("input[name='last_name']").val()
      }
    };
    Accounts.createUser(data, function(error, result) {
      if (error) {
        sAlert.error(error.reason, {effect: 'slide', position: 'top', timeout: 2000});
      }
      else {
        sAlert.success('Account created', {effect: 'slide', position: 'top', timeout: 2000});
      }
    })
  }
});