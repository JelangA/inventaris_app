const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PenempatanLemari = sequelize.define('PenempatanLemari', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_lemari: {
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
    tableName: 'penempatan_lemari', // Nama tabel di database
    timestamps: true, // Menggunakan createdAt dan updatedAt
});

module.exports = PenempatanLemari;
