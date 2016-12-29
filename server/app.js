var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const compression = require('compression'); 
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const {PassportOption, RedisOption, appTitle} = require('./config/app');
const redisStore = new RedisStore(RedisOption);

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });
passport.use(
  new TwitterStrategy(PassportOption,
    (twitter_token, twitter_token_secret, {id, photos, displayName}, done) => {
      done(null, { id, photos, displayName, twitter_token, twitter_token_secret });
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
app.use(logger('dev', { skip() { return app.get('env') === 'test'; } }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
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
app.use(
  '/'
  , (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }
    next();
  }
  , router
);
app.use('/api', api);

// catch all route and forward index
app.use((req, res, next) => {
  // todo circle registration check
  res.render('index', { title: appTitle });
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
