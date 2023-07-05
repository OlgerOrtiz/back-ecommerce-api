const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productImg', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // timestamps: false

    //producId
});

module.exports = ProductImg;