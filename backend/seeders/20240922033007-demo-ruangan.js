'use strict';

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
    await queryInterface.bulkInsert('ruangan', [
      {
        nama_ruangan: 'Lab Komputer',
        luas_ruangan: "10x10",
        id_jurusan: 3,
      },
      {
        nama_ruangan: 'Lab Web',
        luas_ruangan: "10x10",
        id_jurusan: 2,
      },
      {
        nama_ruangan: 'Lab RPL',
        luas_ruangan: "10x10",
        id_jurusan: 2,
      },
      {
        nama_ruangan: 'Lab System',
        luas_ruangan: "10x10",
        id_jurusan: 3,
      },
      {
        nama_ruangan: 'Mini Office',
        luas_ruangan: "10x10",
        id_jurusan: 4,
      },
      {
        nama_ruangan: 'D1',
        luas_ruangan: "10x10",
      },
      {
        nama_ruangan: 'D2',
        luas_ruangan: "10x10",
      },
      {
        nama_ruangan: 'D3',
        luas_ruangan: "10x10",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ruangan', null, {});

  }
};
