setup heroku app
- add Heroku Redis
  - setup environment variables
    - port: REDIS_PORT
    - host: REDIS_URL
    - pass: REDIS_PW

- add Heroku Postgres
  - setup environment variables
    - username: process.env.DATABASE_USER
    - password: process.env.DATABASE_PW
    - database: process.env.DATABASE_DB
    - host: process.env.DATABASE_URL
    - port: process.env.DATABASE_PORT

- setup twitter enviroment variables
  - consumer_key
  - counsumer_secret