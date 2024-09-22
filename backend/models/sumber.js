const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipeUser = sequelize.define('Sumber', {
  tipe: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'sumber',
  timestamps: false,
});

module.exports = TipeUser;
