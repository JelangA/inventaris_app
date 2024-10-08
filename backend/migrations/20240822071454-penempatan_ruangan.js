// migrations/20240823130000-create-penempatan-barang.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penempatan_ruangan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ruangan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_barang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_lemari: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jumlah: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('penempatan_ruangan');
  }
};
