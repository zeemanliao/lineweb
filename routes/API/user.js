'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(app) {
	let model = app.Model;
	/* GET home page. */
	router.get('/:id', function(req, res) {

		if (!req.params.id) {
			res.send(404);
		}

		model.user.get(req.params.id, function(err, user) {
			if (err){
				return res.json({err:err});
			}
			if (!user) {
				return res.send(404);
			}
			res.json(user);
		});

	});

	return router;
};
	