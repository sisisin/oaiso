const api = require('express').Router();
const Twit = require('twit');
const config = require('../config/secret');

const post = (req, res, next) => {
  const {twitter_token, twitter_token_secret} = req.session.passport.user;
  const t = new Twit({
    consumer_key: config.consumerKey
    , consumer_secret: config.consumerSecret
    , access_token: twitter_token
    , access_token_secret: twitter_token_secret
  });
  // t.post('statuses/update', { status: req.body.message }, (err, data, res) => {
  //   if (err) return res.json({ result: 'failed', err });
  //   console.log(data);
  //   res.json({ result: 'success'});
  // });
  console.log(req.body.message);
  res.json({ result: 'success' });
};

const getProfile = (req, res) => {
  res.json(req.session.passport.user);
};

api.post('/update', post);
api.get('/profile', getProfile);

module.exports = { api, post };
