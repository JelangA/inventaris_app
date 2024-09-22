const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PenempatanRuangan = sequelize.define('PenempatanRuangan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_ruangan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_barang: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_lemari: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'penempatan_ruangan', // Nama tabel di database
    timestamps: true, // Menggunakan createdAt dan updatedAt
});

module.exports = PenempatanRuangan;
