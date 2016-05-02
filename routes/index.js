var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/epa');
});

router.get('/chat', function(req, res, next) {

  res.render('pages/chat');
});

router.get('/cwb', function(req, res, next) {

  res.render('pages/cwb');
});

router.get('/epa', function(req, res, next) {

  res.render('pages/epa');
});

router.get('/zeeman', function(req, res, next) {

  res.render('pages/zeeman');
});

router.get('/test', function(req, res, next){

	res.render('pages/test');
});

module.exports = router;
	