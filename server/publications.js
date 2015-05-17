// publish the people in the same url as the user (but not him)
Meteor.publish("opponents", function(url, userId) {
  Meteor.users.find({$and: [{'profile.url' : url}, {$not: {_id : userId}}]});
});
