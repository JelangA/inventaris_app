const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Jurusan = sequelize.define('Jurusan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'jurusan',
    timestamps: false,
});

module.exports = Jurusan;
