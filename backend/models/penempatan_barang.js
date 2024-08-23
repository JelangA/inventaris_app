const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const PenempatanBarang = sequelize.define('PenempatanBarang', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_tempat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_barang: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'penempatan_barang',
    timestamps: false,
});

module.exports = PenempatanBarang;
