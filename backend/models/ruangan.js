const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Ruangan = sequelize.define('Ruangan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nama_ruangan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    luas_ruangan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inventaris_sapras: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'ruangan',
    timestamps: false,
});

module.exports = Ruangan;
