'use strict';

const {hashSync} = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        name: 'John Doe',
        username: 'admin',
        password: hashSync('admin', 10),  // Password yang di-hash
        tipe_user: 'admin',
        no_hp: '081234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'tu',
        username: 'janesmith',
        password: hashSync('tu', 10),  // Password yang di-hash
        tipe_user: 'staf_tu',
        no_hp: '081234567891',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kepala Jurusan RPL',
        username: 'rpl',
        password: hashSync('rpl', 10),  // Password yang di-hash
        tipe_user: 'kep_jurusan',
        no_hp: '081234567892',
        id_jurusan: 1, // Teknik Elektro
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kepala Jurusan TKJ',
        username: 'tkj',
        password: hashSync('tkj', 10),  // Password yang di-hash
        tipe_user: 'kep_jurusan',
        no_hp: '081234567892',
        id_jurusan: 2, // Teknik Elektro
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kepala Jurusan OTKP',
        username: 'otkp',
        password: hashSync('otkp', 10),  // Password yang di-hash
        tipe_user: 'kep_jurusan',
        no_hp: '081234567892',
        id_jurusan: 3, // Teknik Elektro
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
