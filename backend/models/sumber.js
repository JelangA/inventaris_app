const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const TipeUser = sequelize.define('Sumber', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    sumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'sumber',
    timestamps: false,
});

module.exports = TipeUser;
