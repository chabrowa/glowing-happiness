Session.setDefault('page', 'news');

Template.router.helpers({
  selected_page: function(name) {
    return Session.get('page') === name;
  }
});
