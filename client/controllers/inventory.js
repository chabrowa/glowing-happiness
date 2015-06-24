Template.inventory.helpers({
  show_selection: function() {
    return Session.get('show_items');
  }
});

Template.inventory.events({
  'click #select-stone': function() {
    Session.set('show_items', 'stone');
  },
  'click #select-armor': function() {
    Session.set('show_items', 'armor');
  },
  'click #select-rightHand': function() {
    Session.set('show_items', 'rightHand');
  },
  'click #select-leftHand': function() {
    Session.set('show_items', 'leftHand');
  },
  'click #select-head': function() {
    Session.set('show_items', 'head');
  }
});

Template.selection_item.helpers({
  items: function() {
    switch(Session.get('show_items')) {
      case 'stone':
        return Meteor.user().ownedItems.filter(function(item) {return item.type === 'stone';});
      case 'armor':
        return Meteor.user().ownedItems.filter(function(item) {return item.type === 'armor';});
      case 'rightHand':
      case 'leftHand':
        return Meteor.user().ownedItems.filter(function(item) {return item.type === 'weapon';});
      case 'head':
        return Meteor.user().ownedItems.filter(function(item) {return item.type === 'head';});
    }
  }
});

Template.item_selection_item.events({
  'click': function(e, t) {
    Meteor.call('equip', Session.get('show_items'), t.data, function() {Session.set('show_items', null);});
  }
});
