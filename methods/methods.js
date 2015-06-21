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
    while(nextLevel.totalXP <= user.xp + xp) {
      incr++;
      nextLevel = levelsScale[user.level + incr];
    }
    return incr;
  }
});
