Session.set('landing_page', 'home');

Template.landing.events({
  'click .goTologin': function() {
    Session.set('landing_page', 'login');
  },
  'click .goTosignup': function() {
    Session.set('landing_page', 'signup');
  }
});

Template.landing.helpers({
  show_login: function() {
    return Session.get('landing_page') === 'login';
  },
  show_signup: function() {
    return Session.get('landing_page') === 'signup';
  }
});

Template.login.events({
  'submit': function (event, template) {
    event.preventDefault();
    var username = template.find('#username').value;
    var password = template.find('#password').value;

    Meteor.loginWithPassword(username, password, function(error, user){
      if(error) {
       console.log(error); 
      } else {
        Session.set('page', 'news');
        console.log("logged in!");
      }
    });
  },

  'click .back': function(e) {
    e.preventDefault();
    Session.set('landing_page', 'home');
    console.log('click')
  }
});

Template.signup.events({
  'submit': function (event, template) {
    event.preventDefault();
    var username = template.find('#username_signup').value;
    var password = template.find('#password_signup').value;
    var className = template.find('[name=playerClass]:checked').value;
    
    Accounts.createUser({
      username: username,
      password: password,
      profile: {
        className: className
      }
    }, function (error) {
      if (error) {
        console.log("Cannot create user");
      } else {
        Session.set('page', 'stats');
      }
    });
  },
  
  'click .back': function(e) {
    e.preventDefault();
    Session.set('landing_page', 'home');
  }
});
