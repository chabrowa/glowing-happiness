Session.setDefault('page', 'hello');

Template.router.helpers({
  goToSignup: function () {
    return Session.get('page') === 'signup';
  },
  currentLocation: function () {
    return Session.get('page') === 'hello';
  }
});
