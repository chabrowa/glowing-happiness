Template.news.events({

});

Template.news.helpers({
  exploreNewsList: function() {
    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'exploration'}));
  },
  fightNewsList: function() {
    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'fights'}));
  },
  achievementsNewsList: function() {
    return notificationListTransform(Notifications.find({userId: Meteor.userId(), type: 'achievements'}));
  }
  /*'clanNewsList': function() {
    return Notifications.find(Meteor.userId());
  },*/
});

var notificationListTransform = function(originalList) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var transformedList = [];

  function findPrecedenteDate(arr, i) {
    if (i < 0) {
      return null;
    } else if (arr[i].creation) {
      return arr[i].creation;
    } else {
      return findPrecedenteDate(arr, i - 1);
    }
  }

  originalList.forEach(function(item, i) {
    var creationDate = days[item.createdAt.getDay()] + ', ' + item.createdAt.getDate() + ' ' + months[ item.createdAt.getMonth()] + ' ' + item.createdAt.getFullYear();
    var precedenteDate = findPrecedenteDate(transformedList, i - 1);
    if (precedenteDate === creationDate) {
      transformedList.push({
        creation: null,
        message: item.message,
        time: item.createdAt.getHours() + ':' + item.createdAt.getMinutes()
      });
    } else {
      transformedList.push({
        creation: creationDate,
        message: item.message,
        time: item.createdAt.getHours() + ':' + item.createdAt.getMinutes()
      });
    }
  });

  return transformedList;
};
