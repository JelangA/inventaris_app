const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GaleriRuangan = sequelize.define('GaleriRuangan', {
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
  foto_ruangan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'galeri_ruangan', // Nama tabel di database
  timestamps: true, // Menggunakan createdAt dan updatedAt
});

module.exports = GaleriRuangan;
