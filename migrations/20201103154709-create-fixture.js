'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fixtures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goalsHomeTeam: {
        type: Sequelize.INTEGER,
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goalsAwayTeam: {
        type: Sequelize.INTEGER,
      },
      eventTimeStamp: {
        type: Sequelize.INTEGER,
      },
      round: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fixtures');
  },
};
