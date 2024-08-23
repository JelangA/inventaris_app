// migrations/20240823123464-create-barang.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barang', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_inventaris: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      id_penempatan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jenis_sarana: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nama_barang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      foto_barang: {
        type: Sequelize.STRING,
        allowNull: true
      },
      spesifikasi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      satuan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jml_layak_pakai: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jml_tidak_layak_pakai: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pengadaan: {
        type: Sequelize.DATE, // Menggunakan INTEGER untuk YEAR
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('barang');
  }
};
