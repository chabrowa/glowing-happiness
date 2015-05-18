
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
  },
  'click #personalPage': function(event, template) {
    Session.set('page', 'hello');
  }
});