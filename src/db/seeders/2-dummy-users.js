'use strict';

const dummyUsers = require('../dummy-data/dummy_users');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', dummyUsers, {}),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
