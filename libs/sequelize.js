const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('../database/models');

// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  logging: !config.isProd,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

sequelize.sync({ force: true });

module.exports = sequelize;
