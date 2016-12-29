var express = require('express');
var router = express.Router();
const config = require('../config/app');
const db = require('../models/');

const get = (req, res, next) => {
  const title = config.appTitle;
  // todo save to session
  const {id} = req.session.passport.user;
  db.Circle
    .findOne({ where: { twitter_id: id } })
    .then(c => {
      if (c) {
        res.render('index', { title });
      } else {
        res.redirect('/circle');
      }
    });
};

router.get('/', get);

module.exports = { router, get };
