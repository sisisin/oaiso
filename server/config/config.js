module.exports = {
  "development": {
    "username": "local",
    "password": "",
    "database": "onokori",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "local",
    "password": "",
    "database": "onokori_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    logging: () => {}
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
