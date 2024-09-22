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
    await queryInterface.bulkInsert('lemari', [
      {
        no_lemari: 'Lemari SO',
        id_ruangan: 3, // Lab Komputer
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lemari: 'Lemari 2 komputer',
        id_ruangan: 1, // Lab Komputer
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lemari: 'Lemari SO 2',
        id_ruangan: 3, // Ruang Kelas A
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('lemari', null, {});
  }
};
