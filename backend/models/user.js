const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipe_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'user',
});

module.exports = User;
