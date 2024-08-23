'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data yang akan dimasukkan
    const ruanganData = [
      { nama_ruangan: 'Ruang D1', luas_ruangan: 50, foto_ruangan: null, inventaris_sapras: 'Inventaris D1' },
      { nama_ruangan: 'Ruang D2', luas_ruangan: 55, foto_ruangan: null, inventaris_sapras: 'Inventaris D2' },
      { nama_ruangan: 'Ruang D3', luas_ruangan: 60, foto_ruangan: null, inventaris_sapras: 'Inventaris D3' },
      // ...
      { nama_ruangan: 'Ruang D20', luas_ruangan: 100, foto_ruangan: null, inventaris_sapras: 'Inventaris D20' },
      { nama_ruangan: 'Ruang Hardware', luas_ruangan: 120, foto_ruangan: null, inventaris_sapras: 'Inventaris Hardware' },
      { nama_ruangan: 'Ruang Software', luas_ruangan: 110, foto_ruangan: null, inventaris_sapras: 'Inventaris Software' },
      // Tambahkan ruangan lainnya sesuai kebutuhan
    ];

    await queryInterface.bulkInsert('ruangan', ruanganData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ruangan', null, {});
  }
};
