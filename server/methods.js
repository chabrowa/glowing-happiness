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
  },
  // called by the extension when there is a fight
  fight: function(userId, fight) {
    console.log('FIGHT: ' + fight);
    if (userId) {
      Fights.insert({
        attacker: userId,
        defender: fight[fight.length - 1].opponent._id,
        winner: fight[fight.length - 1].action === 'win' ? 'attacker' : 'defender',
        createdAt: new Date()
      });
      return 'got it';
    } else {
      return 'not connected';
    }
  }
});
