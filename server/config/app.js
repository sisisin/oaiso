const isPrd = process.env.NODE_ENV === 'production';

const RedisOption = isPrd ? {
  port: process.env.REDIS_PORT
  , host: process.env.REDIS_URL
  , pass: process.env.REDIS_PW
} : {
    port: 6379
    , host: 'localhost'
  };

const PassportOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY
  , consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  , callbackURL: (isPrd ? 'https://onokori.herokuapp.com' : 'http://localhost:3000') + '/login/callback'
};

module.exports = {
  appTitle: '残り何部ですか'
  , PassportOption
  , RedisOption
};

