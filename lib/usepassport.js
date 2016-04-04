'use strict';

let GitHubStrategy = require('passport-github').Strategy;
let FacebookStrategy = require('passport-facebook');
let GoogleStrategy = require('passport-google-oauth2').Strategy;
let TwitterStrategy = require('passport-twitter');

module.exports = function(passport, app) {
    let cfg = app.locals.config;
    let Storage = app.Storage;

    passport.use(new FacebookStrategy({
            clientID: cfg.oauth.facebook.id,
            clientSecret: cfg.oauth.facebook.secret,
            callbackURL: cfg.oauth.facebook.callbackURL,
            profileFields: ['id', 'email', 'displayName', 'picture', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },

        function(accessToken, refreshToken, profile, done) {
        	getLoginUser(Storage, 'facebook', profile, function(err, user) {
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
        	getLoginUser(Storage, 'google', profile, function(err, user) {
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

        	getLoginUser(Storage, 'twitter', profile, function(err, user) {
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
        	getLoginUser(Storage, 'github', profile, function(err, user) {
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

function getLoginUser(Storage, source, profile, callback) {
    Storage.Users.findOne({ 'source.site': source, 'source.id': profile.id },
        function(err, user) {
            if (err) {
            	consoel.log(err);
                return callback(err);
            }

            if (!user) {
                user = new Storage.Users();
                user.id = 'google_' + profile.id;
                user.name = profile.displayName || profile.username;
                user.email = profile.email || '';
                user.photo = profile.photos[0].value;
                user.source.photo = profile.photos[0].value;
                user.source.name = profile.displayName || profile.username;
                user.source.id = profile.id;
                user.source.site = 'google';
                user.save(function(err) {
                    return callback(err, user);
                });
            } else {
                console.log(user);
                return callback(null, user);
            }


        });
}
