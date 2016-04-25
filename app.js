'use strict';

let isDEV = process.env.NODE_ENV !== 'production';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let csrf = require('csurf');
let socketRoute = require('./routes/socket.io');
let routes = require('./routes/index');
let users = require('./routes/users');
let auth = require('./routes/auth');

let app = express();
let io = require("socket.io")();

let appuse = require('./lib/useapp');

let cfg = require('./config.json');
let mongoSession = session({ 
    secret: 'zeemanliao-super-web',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
     });

app.locals.config = cfg;
app.io = io;

if (isDEV) {

}
//mongo db connect
mongoose.connect('mongodb://localhost/linenet');

let Storage = require('./lib/storage')(mongoose);
app.Storage = Storage;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser('zeemanliao-super-web'));
  app.use(mongoSession);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(csrf());
  appuse(app);
  app.use('/', routes);
  app.use('/users', users);
  app.use('/auth', auth);
  app.use('/api', require('./routes/api')(app));

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {

  switch (err.type) {
    case 'OAuthException':
      return res.status(500).json({type:err.type,message:err.message});
  }
  

  //let err = new Error('Not Found');
  //err.status = 404;
  next(err);
});

io.use(function(socket, next) {
    var req = socket.handshake;
    var res = {};

    let cp = cookieParser('zeemanliao-super-web');
    cp(req, null, function(err, data) {

        if (err) {
            return next(err);
        }
        mongoSession(req, res, next);

    });
});
socketRoute(io, app);
require('./lib/usepassport')(passport, app);

module.exports = app;
