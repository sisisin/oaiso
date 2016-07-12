var express = require('express');
var router = express.Router();
const config = require('../config/app');

router.get('/', function(req, res, next) {
  const session = req.session.passport;
  const title = config.appTitle;
  res.render('index', { title, session });
});

module.exports = router;
