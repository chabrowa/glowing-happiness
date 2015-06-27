// publish the people in the same url as the user (but not him)
Meteor.publish('opponents', function(url, userId) {
  return Meteor.users.find({'profile.url': url}, {fields: {username: 1, hp: 1, defence: 1, luck: 1, strength: 1, speed: 1, dexterity: 1, level: 1, className: 1}});
});

Meteor.publish('me', function() {
  if (this.userId) {
    return Meteor.users.find(this.userId, {fields: {username: 1, hp: 1, defence: 1, luck: 1, strength: 1, speed: 1, dexterity: 1, profile: 1, level: 1, xp: 1, className: 1, gold: 1, diamond: 1, pointsToSpend: 1, armor: 1, rightHand: 1, leftHand: 1, head: 1, stone: 1, ownedItems: 1}});
  } else {
    return this.ready();
  }
});
