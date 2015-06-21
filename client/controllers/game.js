
Template.hello.events({
  'click #logOut': function () {
    Session.set('page', 'login');
    Meteor.logout();
  },
  'click #cityPage': function(event, template) {
    Session.set('page', 'city');
  }
});

Template.city.events({
  'click #logOut': function () {
    Session.set('page', 'login');
    Meteor.logout();
    localStorage['game_user'] = null;
  },
  'click #personalPage': function(event, template) {
    Session.set('page', 'hello');
  }
});
