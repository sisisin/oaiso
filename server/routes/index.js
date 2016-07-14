var express = require('express');
var router = express.Router();
const config = require('../config/app');

const get = (req, res, next) => {
  const session = req.session.passport;
  const title = config.appTitle;
  res.render('index', { title, session });
};

router.get('/', get);

module.exports = { router, get };
