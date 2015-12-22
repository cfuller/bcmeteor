Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

AdminController = RouteController.extend({
  layoutTemplate: 'adminLayout',
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      Router.go('login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/', {
  waitOn: function() {
    return IRLibLoader.load("//players.brightcove.net/4365621380001/6a6ca24b-7acf-4036-a73e-29f0fa50d3c5_default/index.min.js");
  },
  action: function() {
    this.render('home');
  }
});

/** LOGIN **/
Router.route('/login', {
  layoutTemplate: 'loginLayout',
  action: function() {
    this.render('login');
  }
});

Router.route('/logout', function() {
  Meteor.logout();
  Router.go('/');
});

/** ADMIN **/
Router.route('/admin', {
  controller: 'AdminController',
  action: function() {
    this.render('admin')
  }
});

Router.route('/admin/user/create', {
  //controller: 'AdminController',
  layoutTemplate: 'adminLayout',
  action: function() {
    this.render('createUser')
  }
});

Router.route('createVideo', {
  path: '/admin/video/create',
  controller: 'AdminController',
  action: function() {
    this.render('createVideo');
  }
});