'use strict';

const dummyPredictions = require('../dummy-data/prod_predictions');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('predictions', dummyPredictions, {}),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('predictions', null, {}),
};
