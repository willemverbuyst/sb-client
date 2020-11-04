'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'predictions',
      [
        {
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 2,
          userId: 1,
          fixtureId: 573166,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pGoalsHomeTeam: 1,
          pGoalsAwayTeam: 2,
          userId: 2,
          fixtureId: 573166,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pGoalsHomeTeam: 1,
          pGoalsAwayTeam: 1,
          userId: 1,
          fixtureId: 573167,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pGoalsHomeTeam: 4,
          pGoalsAwayTeam: 2,
          userId: 2,
          fixtureId: 573167,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('predictions', null, {});
  },
};
