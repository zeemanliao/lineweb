'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app) {
	let Storage = app.Storage;
	/* GET home page. */
	router.get('/', function(req, res) {
		Storage.EPAs.find({}, function(err, datas) {
			if (err){
				return res.json({err:err});
			}
			if (!datas) {
				return res.send(404);
			}
			res.json(datas);
		});
	});

	return router;
};
	