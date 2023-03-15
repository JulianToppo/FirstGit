const Sequelize= require('sequelize');
const sequelize = require('../util/database');

const forgotPasswordRequests= sequelize.define('forgotPasswordRequests',{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    userId:{
        type:Sequelize.INTEGER
    },
    isactive:{
        type: Sequelize.BOOLEAN
    }
})

module.exports=forgotPasswordRequests