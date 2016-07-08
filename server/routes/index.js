var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const session = req.session.passport;
  const title = 'Express';
  res.render('index', { title, session });
});

module.exports = router;
