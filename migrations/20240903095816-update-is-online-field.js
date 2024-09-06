'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adding the 'is_online' column
    await queryInterface.addColumn('users', 'is_online', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    // Removing the 'is_online' column
    await queryInterface.removeColumn('users', 'is_online');
  }
};
