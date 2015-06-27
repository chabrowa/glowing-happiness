Meteor.methods({
  // called by the extension to update the current url of the user
  changeURL: function(url, userId) {
    console.log(userId + ' at ' + url);
    check(url, String);
    var user = Meteor.users.findOne(userId);
    if (user) {
      checkLoot(user, url);
      Meteor.users.update(userId, {$set: {'profile.url': url}});
      var incrLevel = increaseXP(user, 1);
      return incrLevel;
    } else {
      return 'not connected';
    }
  },

  // called by the extension when there is a fight
  fight: function(userId, fight) {
    console.log('FIGHT: ' + fight);
    if (userId) {
      var user = fight[fight.length - 1].user;
      var defender = fight[fight.length - 1].opponent;
      var winner = fight[fight.length - 1].action === 'win' ? user : defender;
      var loser = fight[fight.length - 1].action === 'win' ? defender : user;

      Notifications.insert({
        userId: defender._id,
        type: 'fights',
        message: user.username + ' attacked you and ' + fight[fight.length - 1].action === 'win' ? 'won :(' : 'lost!',
        createdAt: new Date()
      });

      var incrLevel = increaseXP(winner, Math.max((defender.level - winner.level + 5) * 20, 0));

      Fights.insert({
        attacker: userId,
        defender: defender._id,
        winner: fight[fight.length - 1].action === 'win' ? 'attacker' : 'defender',
        createdAt: new Date()
      });
      return incrLevel;
    } else {
      return 'not connected';
    }
  }
});

function checkLoot(user, url) {
  // gold
  if ((Math.random() * 100) + (4 * Math.log(user.luck / 4)) > 55) {
    var gold = Math.floor(Math.random() * 10);
    Meteor.users.update(user._id, {$inc: {gold: gold}}, function() {});
    Notifications.insert({
        userId: user._id,
        type: 'exploration',
        message: 'You\'ve found ' + gold + ' golds on ' + url + '.',
        createdAt: new Date()
      }, function() {});

    // loot
    if ((Math.random() * 100) + (4 * Math.log(user.luck / 4)) > 90) {
      var choosingGroup = Math.floor(Math.random() * 100);

      var item;
      if (choosingGroup <= 25) {
        item = Math.floor(Math.random() * (Armors.length));
        item = Armors[item];
      } else if (choosingGroup <= 50) {
        item = Math.floor(Math.random() * (Heads.length));
        item = Heads[item];
      } else if (choosingGroup <= 75) {
        item = Math.floor(Math.random() * (Weapons.length));
        item = Weapons[item];
      } else {
        item = Math.floor(Math.random() * (Stones.length));
        item = Stones[item];
      }

      Meteor.users.update(user._id, {$push: {ownedItems: item}});
      Notifications.insert({
        userId: user._id,
        type: 'exploration',
        message: 'You\'ve found ' + item.name + ' on ' + url + '.',
        createdAt: new Date()
      }, function() {});

    }
  }
}

function increaseXP(user, xp) {
  Meteor.users.update(user._id, {$inc: {xp: xp}}, function() {});
  var incrLevel = Meteor.call('checkLevel', user, xp);
  if (incrLevel) {
    Meteor.users.update(user._id, {$inc: {level: incrLevel, pointsToSpend: 2 * incrLevel}}, function() {
      Notifications.insert({
        userId: user._id,
        type: 'achievements',
        message: 'Level up! You\'re now level ' + user.level + incrLevel + '.',
        createdAt: new Date()
      }, function() {});
    });
  }

  return incrLevel;
}
