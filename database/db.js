const { Sequelize } = require('sequelize');
const env = require('../utils/database')

const sequelizeDB = new Sequelize(
    env.DB_DATABASE,
    env.DB_USERNAME,
    env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    port: env.DB_PORT
});

module.exports = sequelizeDB;