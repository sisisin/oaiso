var express = require('express');
var router = express.Router();
const config = require('../config/app');

const get = (req, res, next) => {
  const title = config.appTitle;
  res.render('index', { title });
};

router.get('/', get);

module.exports = { router, get };
