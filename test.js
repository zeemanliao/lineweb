var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');

mongoose.connect('mongodb://localhost/linenet');

var Storage = require('./lib/Storage')(mongoose);

Storage.Users.findOne(
	{
		'source.site':'google',
		'source.id':'103113602950397809948'
	},function(err, user) {
		console.log(user);
	}
	);
