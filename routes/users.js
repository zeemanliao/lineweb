var express = require('express');
var router = express.Router();

router.route('/me').get(
  function(req, res) {
  	if (req.user) {
    	res.json(req.user);
    } else {
    	res.json(null);
    }
  });

module.exports = router;
