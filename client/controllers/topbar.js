Template.topbar.onRendered(function() {
  var margin = (window.innerWidth - 25) % 50;
  this.find('.right-part').style.marginRight = margin + 'px';
});

Template.topbar.helpers({
  'selected': function(name) {
    return Session.get('page') === name;
  },
  'percentXP': function() {
    var currentLevel = levelsScale[Meteor.user().level - 1];
    if (currentLevel) {
      return 100 * (Meteor.user().xp - currentLevel.totalXP) / currentLevel.toNextLevel;
    }
    return 0;
  }
});

Template.topbar.events({
  'click .news': function() {
    Session.set('page', 'news');
  },
  'click .stats': function() {
    Session.set('page', 'stats');
  },
  'click .inventory': function() {
    Session.set('page', 'inventory');
  },
  'click .achievements': function() {
    Session.set('page', 'achievements');
  },
  'click .clan': function() {
    Session.set('page', 'clan');
  },
  'click .settings': function() {
    Session.set('page', 'settings');
  }
});

Template.inventory.onRendered(function() {
  var margin = (window.innerWidth - 25) % 50;
  this.find('.main').style.paddingRight = margin + 'px';
});
