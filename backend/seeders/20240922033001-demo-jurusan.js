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
    await queryInterface.bulkInsert('jurusan', [
      {
        jurusan: 'TU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        jurusan: 'RPL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        jurusan: 'TKJ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        jurusan: 'OTKP',
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
    await queryInterface.bulkDelete('jurusan', null, {});
  }
};
