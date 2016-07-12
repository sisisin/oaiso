var express = require('express');
var router = express.Router();
var passport = require('passport');
const config = require('../config/app');

router.get('/', function(req, res, next) {
  const title = config.appTitle;
  res.render('login', { title });
});
router.get('/oauth', passport.authenticate('twitter'));
router.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

module.exports = router;
