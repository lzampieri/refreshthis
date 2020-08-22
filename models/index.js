const Sequelize = require('sequelize');
 
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
);

const models = {
  sequelize: sequelize,
  webpages: require('./webpages')(sequelize,Sequelize)
}

module.exports = models;