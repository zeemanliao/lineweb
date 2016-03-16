var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('logined');
    res.redirect('/');
  });

module.exports = router;