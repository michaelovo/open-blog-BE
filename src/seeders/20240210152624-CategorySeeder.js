'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Sport',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entertainment',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Technology',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Economy',
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
