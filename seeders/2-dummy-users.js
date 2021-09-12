'use strict';

const dummyUsers = require('../dummy-data/prod_users');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', dummyUsers, {}),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
