'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserEmployees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emp_user_id: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER
      },
      real_name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM
      },
      dept_id: {
        type: Sequelize.STRING
      },
      contact_info: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.STRING
      },
      last_login_time: {
        type: Sequelize.DATE
      },
      create_time: {
        type: Sequelize.DATE
      },
      update_time: {
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserEmployees');
  }
};