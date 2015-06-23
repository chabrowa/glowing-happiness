Template.inventory.helpers({
  show_selection: function() {
    return Session.get('show_items');
  }
});

Template.inventory.events({
  'click #select-stone': function(e, t) {
    Session.set('show_items', 'stone');
  }
});

Template.selection_item.helpers({
  items: function() {
    if (Session.get('show_items') === 'stone') {
      return Stones;
    }
  }
});
