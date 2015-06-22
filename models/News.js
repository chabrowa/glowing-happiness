News = new Mongo.Collection("news");

News.allow({
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
	createdAt,
	userId,
	message,
	type
}

*/
