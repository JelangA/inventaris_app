const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LogPengadaan = sequelize.define('LogPengadaan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  no_inventaris: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stok_asal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipe_pengadaan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'log_pengadaan',
  timestamps: false,
});

module.exports = LogPengadaan;
