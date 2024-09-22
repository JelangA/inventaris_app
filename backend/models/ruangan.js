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
        type: DataTypes.STRING,
        allowNull: false,
    },
    inventaris_sapras: {
        type: DataTypes.STRING,
    },
    id_jurusan: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'ruangan',
    timestamps: false,
});

module.exports = Ruangan;
