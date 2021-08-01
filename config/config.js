require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_DEV,
    dialect: 'postgres',
    operatorsAliases: '0',
  },
  test: {
    url: 'database_test',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
