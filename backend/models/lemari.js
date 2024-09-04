const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Lemari = sequelize.define('Lemari', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    no_lemari: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_jurusan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'lemari',
    timestamps: false,
});

module.exports = Lemari;
