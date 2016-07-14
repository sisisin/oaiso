var express = require('express');
var login = express.Router();
var passport = require('passport');
const config = require('../config/app');

const get = (req, res, next) => {
  const title = config.appTitle;
  res.render('login', { title });
};

login.get('/', get);
login.get('/oauth', passport.authenticate('twitter'));
login.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

module.exports = { login, get };
