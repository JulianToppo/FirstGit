const Sequelize= require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


console.log(process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD)


const sequelize = new Sequelize(
    process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,
    {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

module.exports= sequelize;