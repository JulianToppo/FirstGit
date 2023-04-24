const Sequelize= require('sequelize');
const sequelize= require('../util/database')

const User= sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true

    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
       
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
       
    },
    phonenumber:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports=User;