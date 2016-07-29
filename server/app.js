var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisStore = new RedisStore({
  port: 6379
  , host: 'localhost'
});

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
const {consumerKey, consumerSecret} = require('./config/secret');
const callbackURL = 'http://localhost:3000/login/callback';

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });
passport.use(
  new TwitterStrategy({ consumerKey, consumerSecret, callbackURL },
  (twitter_token, twitter_token_secret, profile, done) => {
    done(null, Object.assign(profile, { twitter_token, twitter_token_secret }));
  })
);

const { router } = require('./routes/index');
const { login } = require('./routes/login');
const { api } = require('./routes/api/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', { skip() { return app.get('env') === 'test'; }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: redisStore,
  secret: 'nokorinanbu',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/'
  ,(req, res, next) =>
    !!req.session && !!req.session.passport ? next() : res.redirect('/login')
  , router
);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
