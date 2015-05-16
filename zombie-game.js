if (Meteor.isClient) {
  
  Session.setDefault('loggedPage', 'hello');
  
  Template.cityOrPersonalPage.helpers({
    currentLocation: function () {
      return Session.get('loggedPage') === 'hello';
    }
  });


  Template.hello.events({
    'click #logOut': function () {
      Session.set('page', 'login');
      Meteor.logout();
    },
    'click #cityPage': function(event, template) {
      Session.set('loggedPage', 'city');
    }
  });
  
  Template.city.events({
    'click #logOut': function () {
      Session.set('page', 'login');
      Meteor.logout();
    },
    'click #personalPage': function(event, template) {
      Session.set('loggedPage', 'hello');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
