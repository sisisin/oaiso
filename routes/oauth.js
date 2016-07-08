var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('twitter'));
router.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

module.exports = router;
