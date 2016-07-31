const Twit = require('twit');
const config = require('../../config/app');

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

module.exports = { post };
