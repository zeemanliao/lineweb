var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/chat', function(req, res, next) {
  res.render('pages/chat');
});

module.exports = router;
	