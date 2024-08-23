'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        username: 'john_doe',
        password: 'hashed_password1', // Gantilah dengan password yang telah di-hash
        role: 'user',
        no_hp: 1234567890, // Contoh nomor HP
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Doe',
        username: 'jane_doe',
        password: 'hashed_password2', // Gantilah dengan password yang telah di-hash
        role: 'user',
        no_hp: 9876543210, // Contoh nomor HP
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin User',
        username: 'admin',
        password: 'hashed_admin_password', // Gantilah dengan password yang telah di-hash
        role: 'admin',
        no_hp: 1112233445, // Contoh nomor HP
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
