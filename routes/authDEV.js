'use strict';

let passport = require('passport');
let express = require('express');
let router = express.Router();

module.exports = function(app) {
    let cfg = app.locals.config;
    let auth = app.Model.auth;
router.get('/facebook', function(req, res, next) {
    auth.getUser('facebook', {id:cfg.oauth.facebook.testID}, function(err, user) {
        if (err) {
            return next(err);
        }
        req.session.user = user;
        res.redirect('/');
        
    });
});

router.get('/google', function(req, res, next) {

    auth.getUser('google', {id:cfg.oauth.google.testID}, function(err, user) {
        if (err) {
            return next(err);
        }
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    });
});

router.get('/logout',
    function(req, res) {
    req.session.user = null;
    delete req.session.user;
    res.redirect('/');
    });

    return router;
}