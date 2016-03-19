
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

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

var appuse = require('./appuse');

var cfg = require('./config-test.json');

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
  var err = new Error('Not Found');
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
    callbackURL: cfg.oauth.facebook.url
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
    var user = {
      id:profile.id,
      name:profile.displayName,
      source:'facebook',
      photo:'http://graph.facebook.com/'+profile.id+'/picture'
    };
    return cb(err,user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = app;
