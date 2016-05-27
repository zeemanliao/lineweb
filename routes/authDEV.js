'use strict';

let passport = require('passport');
let express = require('express');
let router = express.Router();

module.exports = function(app) {
    let cfg = app.locals.config;
    let User = app.Model.user;
router.get('/facebook', function(req, res, next) {
    User.get(cfg.oauth.facebook.testID, function(err, user) {
        if (err) {
            return next(err);
        }
        req.session.user = user;
        res.redirect('/');
        
    });
});

router.get('/google', function(req, res, next) {

    User.get(cfg.oauth.google.testID, function(err, user) {
        if (err) {
            return next(err);
        }
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