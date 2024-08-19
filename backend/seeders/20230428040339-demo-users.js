'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert("users", [
            {
                name: "morpheus",
                job: "leader",
            },
            {
                name: "trinity",
                job: "developer",
            },
            {
                name: "neo",
                job: "developer",
            },
            {
                name: "john wick",
                job: "assassin",
            },
            {
                name: "james bond",
                job: "spy",
            },
            {
                name: "ethan hunt",
                job: "spy",
            },
            {
                name: "jason bourne",
                job: "spy",
            },
            {
                name: "dominic toretto",
                job: "driver",
            },
            {
                name: "luke hobbs",
                job: "police",
            },
            {
                name: "deckard shaw",
                job: "police",
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    }
};
