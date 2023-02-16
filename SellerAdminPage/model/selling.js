const Entity = require('../util/database');
const Sequelize = require('sequelize');
const sellingEntity = Entity.define('sellingEntity', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    sellingPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    category: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}
);

module.exports = sellingEntity;