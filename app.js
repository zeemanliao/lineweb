'use strict';

let isDEV = process.env.NODE_ENV !== 'production';

let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
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
let cfg = require('./config.json');
let app = express();
let io = require('socket.io')();

let errorHandler = require('./lib/errorHandler');
//let expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000); // 

let mongoSession = session({
    secret: cfg.secret,
    resave: false, //don't save session if unmodified
    saveUninitialized: true, //create session until something stored
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 60 * 60, // time period in seconds
        clear_interval: 20 * 60
    }),
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
});

app.locals.config = cfg;
app.io = io;
if (isDEV) {
    cfg.db.mongodb.server = 'localhost';
}
//Secure
let helmet = require('helmet');
//app.disable('x-powered-by');
app.use(helmet());
//mongodb connect
mongoose.connect('mongodb://' + cfg.db.mongodb.server + '/' + cfg.db.mongodb.db, {
    user: cfg.db.mongodb.user,
    pass: cfg.db.mongodb.pass
});

let Storage = require('./lib/storage')(mongoose);
app.Storage = Storage;

let Models = require('./lib/models')(app);
app.Model = Models;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (isDEV) {
    app.use(logger('dev'));
} else {
    app.use(logger('short'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());

app.use(function(req, res, next) {
    if (req.user) {
        req.user.last = new Date().getTime();
    } else if (req.session.user) {
        req.user = req.session.user;
    }
    res.locals.user = req.user;
    next();
});
app.use('/', routes);
app.use('/users', users);
if (isDEV) {
    app.use('/auth', require('./routes/authDEV')(app));
    app.all('/api/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });
} else {
    app.use('/auth', auth);
}
require('./routes/api')(app);
require('./routes/game')(app);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {

    switch (err.type) {
        case 'OAuthException':
            return res.status(500).json({ type: err.type, message: err.message });
    }


    //let err = new Error('Not Found');
    //err.status = 404;
    next(err);
});

io.use(function(socket, next) {
    var req = socket.handshake;
    var res = {};

    let cp = cookieParser(cfg.secret);
    cp(req, null, function(err) {

        if (err) {
            return next(err);
        }
        mongoSession(req, res, next);

    });
});
socketRoute(io, app);
require('./lib/useauth')(app);

errorHandler(app);
module.exports = app;
