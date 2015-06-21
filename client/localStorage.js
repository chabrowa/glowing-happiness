// put the current user in the localstorage for the content script to access it.

Accounts.onLogin(function() {
  Meteor.subscribe('me', function() {localStorage['game_user'] = JSON.stringify(Meteor.user());});
});
