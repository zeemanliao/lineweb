var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/google',
  passport.authenticate('google', { scope: 
  	[ 'https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));
 
router.get('/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/',
		failureRedirect: '/'
}));

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/github',
  passport.authenticate('github'));
 
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    res.redirect('/');
  });
router.get('/logout',
	function(req, res) {
	req.logout();
	res.redirect('/');
	});
module.exports = router;