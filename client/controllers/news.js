Template.news.events({

});

Template.news.helpers({
  'exploreNewsList': function () {
/*  function() {
      fixtures = [{
        userId: Meteor.userId(),
        type: 'exploration',
        message: 'You\'ve found 10 golds on google.com.',
        createdAt: new Date()
      },{
        userId: Meteor.userId(),
        type: 'exploration',
        message: 'You\'ve found 8 golds on blabla.com.',
        createdAt: new Date()
      }];*/

    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'exploration'}));
  },
  'fightNewsList': function() {
    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'fights'}));
  },
  'achievementsNewsList': function() {
    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'achievements'}));
  }
  /*'clanNewsList': function() {
    return Notifications.find(Meteor.userId());
  },*/
});

var notificationListTransform = function(orginalList) {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    transformedList = [];

    for(var i = 0; i < orginalList.length; i++) {
      if( i === 0) {
        transformedList.push({
          creation: days[orginalList[i].createdAt.getDay()]+', ' +orginalList[i].createdAt.getDate()+' '+months[ orginalList[i].createdAt.getMonth()]+" "+orginalList[i].createdAt.getFullYear(),
          message: orginalList[i].message,
          time: orginalList[i].createdAt.getHours()+':'+orginalList[i].createdAt.getMinutes()
        });
      } else {
        var creationDate = days[orginalList[i].createdAt.getDay()]+', ' +orginalList[i].createdAt.getDate()+' '+months[ orginalList[i].createdAt.getMonth()]+" "+orginalList[i].createdAt.getFullYear();

        if(transformedList[i-1].creation === creationDate) {
          transformedList.push({
            creation: null,
            message: orginalList[i].message,
            time: orginalList[i].createdAt.getHours()+':'+orginalList[i].createdAt.getMinutes()
          });
        } else {
          transformedList.push({
            creation: creationDate,
            message: orginalList[i].message,
            time: orginalList[i].createdAt.getHours()+':'+orginalList[i].createdAt.getMinutes()
          });
        }
      }
    }
  return transformedList;
};
