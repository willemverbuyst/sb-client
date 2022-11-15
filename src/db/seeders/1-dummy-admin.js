'use strict';

const dummyAdmin = require('../dummy-data/dummy_admin');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', dummyAdmin, {}),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
