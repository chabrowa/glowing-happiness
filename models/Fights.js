Fights = new Mongo.Collection('fights');

Fights.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fields, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});

/*

{
	_id,
	attacker,
	defender,
	winner,
	createdAt
}

*/
