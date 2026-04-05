const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  String(process.env.PG_PASSWORD), 
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected ✅');
    } catch (error) {
        console.error('DB Error:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);