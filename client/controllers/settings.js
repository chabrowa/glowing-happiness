Template.settings.events({
  'click #logoutBnt': function() {
    Session.set('landing_page', 'home');
    Meteor.logout();
  }
});
