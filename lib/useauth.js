'use strict';
let passport = require('passport');
let GitHubStrategy = require('passport-github').Strategy;
let FacebookStrategy = require('passport-facebook');
let GoogleStrategy = require('passport-google-oauth2').Strategy;
let TwitterStrategy = require('passport-twitter');
module.exports = function(app) {
    let cfg = app.locals.config;
    let Storage = app.Storage;

    passport.use(new FacebookStrategy({
            clientID: cfg.oauth.facebook.id,
            clientSecret: cfg.oauth.facebook.secret,
            callbackURL: cfg.oauth.facebook.callbackURL,
            profileFields: ['id', 'email', 'displayName', 'picture', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },

        function(accessToken, refreshToken, profile, done) {
        	getLoginUser(app, 'facebook', profile, function(err, user) {
        		return done(err, user);
        	});
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: cfg.oauth.google.id,
            clientSecret: cfg.oauth.google.secret,
            callbackURL: cfg.oauth.google.callbackURL,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
        	getLoginUser(app, 'google', profile, function(err, user) {
        		return done(err, user);
        	});
        }
    ));

    passport.use(new TwitterStrategy({
            consumerKey: cfg.oauth.twitter.id,
            consumerSecret: cfg.oauth.twitter.secret,
            callbackURL: cfg.oauth.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {

        	getLoginUser(app, 'twitter', profile, function(err, user) {
        		return done(err, user);
        	});
        }
    ));

    passport.use(new GitHubStrategy({
            clientID: cfg.oauth.github.id,
            clientSecret: cfg.oauth.github.secret,
            callbackURL: cfg.oauth.github.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
        	getLoginUser(app, 'github', profile, function(err, user) {
        		return done(err, user);
        	});
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

}

function getLoginUser(app, source, profile, callback) {
    let auth = app.Model.auth;
    auth.getUser(source, profile, function(err, user) {
        if (err) {
            return callback(err);
        }

        if (user) {
            callback(null, user);
        } else {
            auth.createUser(source, profile, callback);
        }
    });
}