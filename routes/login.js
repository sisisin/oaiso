var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const title = '残り何部ですか？';
  res.render('login', { title });
});

module.exports = router;
