var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.route('/users/me').get(
  function(req, res) {
  	console.log('-------------- ------------------');
  	console.log(req.user);
  	if (req.user) {
    	res.json(req.user);
    } else {
    	res.json(null);
    }
  });
module.exports = router;