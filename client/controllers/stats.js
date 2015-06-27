Template.stats.events({
  'click .increase.strength': function() {
    Meteor.call('increaseStat', 'strength', function() {});
  },
  'click .increase.speed': function() {
    Meteor.call('increaseStat', 'speed', function() {});
  },
  'click .increase.dexterity': function() {
    Meteor.call('increaseStat', 'dexterity', function() {});
  }
});
