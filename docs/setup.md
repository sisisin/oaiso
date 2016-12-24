# setup heroku app

- add Heroku Redis
  - install addon
  - setup environment variables
    - port: REDIS_PORT
    - host: REDIS_HOST
    - pass: REDIS_PW

- add Heroku Postgres
  - install addon
  - setup environment variables
    - username: process.env.DATABASE_USER
    - password: process.env.DATABASE_PW
    - database: process.env.DATABASE_DB
    - host: process.env.DATABASE_HOST
    - port: process.env.DATABASE_PORT

- setup twitter enviroment variables
  - consumer_key
  - counsumer_secret

- enable Heroku Automatic deploys(checks `Wait for CI to pass before deploy`)

