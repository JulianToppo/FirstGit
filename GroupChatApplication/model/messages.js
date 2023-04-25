const Sequelize= require('sequelize');
const sequelize= require('../util/database')

const Messages= sequelize.define('messages',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true

    },
    message:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true 
    }
})

module.exports=Messages;