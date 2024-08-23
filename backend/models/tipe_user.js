const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipeUser = sequelize.define('TipeUser', {
    tipe: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'tipe_user',
    timestamps: false,
});

module.exports = TipeUser;
