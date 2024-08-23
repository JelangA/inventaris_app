const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Barang = sequelize.define('Barang', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    no_inventaris: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    id_penempatan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jenis_sarana: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_barang: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto_barang: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    spesifikasi: {
        type: DataTypes.TEXT,
    },
    satuan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jml_layak_pakai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jml_tidak_layak_pakai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pengadaan: {
        type: DataTypes.INTEGER, // Menggunakan INTEGER untuk YEAR
        allowNull: false,
    },
}, {
    tableName: 'barang',
    timestamps: false,
});

module.exports = Barang;