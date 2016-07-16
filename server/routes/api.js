const api = require('express').Router();

const post = (req, res, next) => {
  const {twitter_token, twitter_token_secret} = req.session.passport;
  res.json({ result: 'success' });
};

const getProfile = (req, res) => {
  res.json(req.session.passport.user);
};

api.post('/update', post);
api.get('/profile', getProfile);

module.exports = { api, post };
