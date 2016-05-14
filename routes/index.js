'use strict';
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/epa');
});

router.get('/chat', function(req, res) {

  res.render('pages/chat');
});


router.get('/epa', function(req, res) {

  res.render('pages/epa');
});

router.get('/game', function(req, res) {

  res.render('pages/game');
});

module.exports = router;
	