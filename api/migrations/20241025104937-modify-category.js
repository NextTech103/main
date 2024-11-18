'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Categories', 'icon', {
      type: Sequelize.STRING,
      allowNull:false,
      validate: {
          notEmpty: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'icon');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
