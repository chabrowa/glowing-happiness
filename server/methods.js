Meteor.methods({
  // called by the extension to update the current url of the user
  changeURL: function(url, userId) {
    console.log(userId + ' at ' + url);
    check(url, String);
    if (userId) {
      Meteor.users.update(userId, {$set: {'profile.url': url}});
      return 'got it';
    } else {
      return 'not connected';
    }
  }
});
