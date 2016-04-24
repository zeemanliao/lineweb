'use strict';
var express = require('express');

var router = express.Router();


module.exports = function(app) {
	let Storage = app.Storage;
	/* GET home page. */
	router.get('/epa', function(req, res, next) {
		Storage.EPAs.find({}, function(err, datas) {
			if (err)
				return res.json({err:err});

			res.json(datas);
		});
	});

	return router;
};
	