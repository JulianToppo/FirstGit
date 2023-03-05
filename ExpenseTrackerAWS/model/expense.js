const { UniqueConstraintError } = require('sequelize');
const Sequelize= require('sequelize');
const sequelize= require('../util/database');

const expense= sequelize.define('expense',{
         id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        
        },
        expenseAmount:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false

        },
        category:{
            type: Sequelize.TEXT,
            allowNull: false

        }
    }
);

module.exports= expense;