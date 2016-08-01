module.exports = {
  development: {
    username: 'local',
    password: '',
    database: 'onokori',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'local',
    password: '',
    database: 'onokori_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: () => { }
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres'
  }
}
