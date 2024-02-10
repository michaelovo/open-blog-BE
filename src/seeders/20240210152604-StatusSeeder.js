'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Statuses', [
      {
        name: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Inactive',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suspend',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
