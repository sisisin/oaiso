const isPrd = process.env.NODE_ENV === 'production';

const RedisOption = isPrd ? {
  port: process.env.REDIS_PORT
  , host: process.env.REDIS_HOST
  , pass: process.env.REDIS_PW
  , ttl: 259200 // sec. 3day expire  
} : {
    port: 6379
    , host: 'localhost'
  , ttl: 86400 // sec. 1day expire  
  };

const PassportOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY
  , consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  , callbackURL: (isPrd ? 'https://oaiso.herokuapp.com' : 'http://localhost:3000') + '/login/callback'
};

module.exports = {
  appTitle: '残り何部ですか'
  , PassportOption
  , RedisOption
};

