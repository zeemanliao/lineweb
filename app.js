var isDEV = process.env.NODE_ENV !== 'production';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google-oauth2' ).Strategy;
var TwitterStrategy = require('passport-twitter');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

var appuse = require('./appuse');

var cfg = require('./config.json');


if (isDEV) {

}
//mongo db connect
mongoose.connect('mongodb://localhost/linenet');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session({ 
    secret: 'zeemanliao-super-web',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
     }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
  appuse(app);
  app.use('/', routes);
  app.use('/users', users);
  app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {

  //var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.locals.site ={
        title: 'Linenet',
        description: 'A boilerplate for a simple web application with a Node.JS and Express backend, with an EJS template with using Twitter Bootstrap.'
    };
app.locals.author = {
        name: 'Zeeman Lio',
        contact: 'zeeman.liao@gmail.com'
    };



passport.use(new FacebookStrategy({
    clientID: cfg.oauth.facebook.id,
    clientSecret: cfg.oauth.facebook.secret,
    callbackURL: cfg.oauth.facebook.callbackURL,
     profileFields: ['id', 'email','displayName','picture', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  },
/* profile
{ id: '1139908889355735',
  username: undefined,
  displayName: '廖哥',
  name:
   { familyName: undefined,
     givenName: undefined,
     middleName: undefined },
  gender: undefined,
  profileUrl: undefined,
  provider: 'facebook',
  _raw: '{"name":"\\u5ed6\\u54e5","id":"1139908889355735"}',
  _json: { name: '廖哥', id: '1139908889355735' } }
*/
  function(accessToken, refreshToken, profile, cb) {
    var err = null;
    console.log(profile);
    var user = {
      id:profile.id,
      name:profile.displayName || profile.username,
      source:'facebook',
      photo:profile.photos[0].value //'http://graph.facebook.com/'+profile.id+'/picture'
    };
    return cb(err,user);
  }
));
/*
{ kind: 'plus#person',
     etag: '"4OZ_Kt6ujOh1jaML_U6RM6APqoE/SYsOtR6FRFFflr6UuOcHc8821LA"',
     gender: 'male',
     emails: [ [Object] ],
     objectType: 'person',
     id: '103113602950397809948',
     displayName: '廖哥',
     name: { familyName: '廖', givenName: '哥' },
     url: 'https://plus.google.com/103113602950397809948',
     image:
      { url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',
        isDefault: true },
     isPlusUser: true,
     language: 'zh_TW',
     ageRange: { min: 21 },
     circledByCount: 7,
     verified: false } }
     */
passport.use(new GoogleStrategy({
    clientID: cfg.oauth.google.id,
    clientSecret: cfg.oauth.google.secret,
    callbackURL: cfg.oauth.google.callbackURL,
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
        var user = {
          id:profile.id,
          name:profile.displayName || profile.username,
          source:'google',
          email:profile.email,
          photo:profile.photos[0].value
        };
    return done(null, user);
    
  }
));

passport.use(new TwitterStrategy({
    consumerKey: cfg.oauth.twitter.id,
    consumerSecret: cfg.oauth.twitter.secret,
    callbackURL: cfg.oauth.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {

    var user = {
          id:profile.id,
          name:profile.displayName || profile.username,
          source:'twitter',
          email:profile.email,
          photo:profile.photos[0].value
        };
      return done(null, user);
  }
));

var GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
    clientID: cfg.oauth.github.id,
    clientSecret: cfg.oauth.github.secret,
    callbackURL: cfg.oauth.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var user = {
          id:profile.id,
          name:profile.displayName || profile.username,
          source:'github',
          email:profile.email,
          photo:profile.photos[0].value
        };
      return done(null, user);
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = app;
