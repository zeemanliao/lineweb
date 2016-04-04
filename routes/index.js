var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/chat', function(req, res, next) {
	var name = '';
	if (req.user) {
		name = req.user.name;
	}
  res.render('pages/chat',{name: name});
});

module.exports = router;
	