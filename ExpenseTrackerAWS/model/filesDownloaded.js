const Sequelize= require('sequelize')
const sequelize = require('../util/database')

const fileDownloaded= sequelize.define('fileDownloaded',{
    id:{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    fileURL:{
        type : Sequelize.STRING,
        allowNull: false
    }

})

module.exports= fileDownloaded;