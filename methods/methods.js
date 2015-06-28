Meteor.methods({
  increaseStat: function(stat) {
    if (!this.userId || ['strength', 'speed', 'dexterity'].indexOf(stat) === -1) {
      return;
    }

    var user = Meteor.users.findOne(this.userId);
    if (!user.pointsToSpend) {
      return;
    }

    var update = {pointsToSpend: -1};
    update[stat] = 1;
    Meteor.users.update(this.userId, {$inc: update});
    return;
  },
  checkLevel: function(user, xp) {
    var incr = 0;
    var nextLevel = levelsScale[user.level];
    while (nextLevel.totalXP <= user.xp + xp) {
      incr++;
      nextLevel = levelsScale[user.level + incr];
    }

    return incr;
  },
  equip: function(slot, item) {
    if (!this.userId) {return;}

    var user = Meteor.users.findOne(this.userId);
    var oldItem = user[slot];
    var update = {$inc: {}, $set:{}};
    oldItem.characteristics.forEach(function(characteritic) {
      update.$inc[characteritic.name] = -parseInt(characteritic.value);
    });

    item.characteristics.forEach(function(characteritic) {
      update.$inc[characteritic.name] += parseInt(characteritic.value);
    });

    if (oldItem.characteristics.length + item.characteristics.length === 0) {
      delete update.$inc;
    }

    update.$set[slot] = item;
    return Meteor.users.update(this.userId, update);
  }
});
