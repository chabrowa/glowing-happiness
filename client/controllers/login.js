Template.login.events({
  'submit': function (event, template) {
    event.preventDefault();
    var userName = template.find('#userName').value;
    var userPass = template.find('#userPass').value;

    Meteor.loginWithPassword(userName, userPass, function(error, user){
      if(error) {
       console.log(error); 
      } else {
        Session.set('page', 'hello');
        console.log("loged in!"); 
      }
    });
  },

  'click button': function (event, template) {
    Session.set('page', 'signup');
  }
});

Template.signup.events({
  'submit': function (event, template) {
    event.preventDefault();
    var userName = template.find('#userName').value;
    var userPass = template.find('#userPass').value;
    var userPass2 = template.find('#userPass2').value;
    //var userPassRepeat template.find('#userPassRepeat').value;
    
    var userRace = template.find('[name=playerRace]:checked').value;
    var userClass = template.find('[name=playerClass]:checked').value;
    
   var validates = true;

   if(userPass != userPass2) {
      validates = false;
   }

    if(validates === true) {
      Accounts.createUser({
        username: userName,
        password: userPass,
        profile: {
          userRace: userRace,
          userClass: userClass
        }
      }, function (error) {
        if (error) {
          console.log("Cannot create user");
        } else {
          Session.set('page', 'hello');
        }
      });
    }
  },
  
  'click button': function (event, template) {
    Session.set('page', 'login');
  }
});