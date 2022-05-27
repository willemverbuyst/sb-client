'use strict';

const dummyPredictions = require('../dummy-data/dummy_predictions.json');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('predictions', dummyPredictions, {}),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('predictions', null, {}),
};
