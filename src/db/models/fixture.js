'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class fixture extends Model {
    static associate(models) {
      fixture.hasMany(models.prediction);
    }
  }
  fixture.init(
    {
      homeTeamId: { type: DataTypes.INTEGER, allowNull: false },
      homeTeamName: { type: DataTypes.STRING, allowNull: false },
      homeTeamLogo: DataTypes.TEXT,
      goalsHomeTeam: { type: DataTypes.INTEGER, allowNull: true },
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamName: { type: DataTypes.STRING, allowNull: false },
      awayTeamLogo: DataTypes.TEXT,
      goalsAwayTeam: { type: DataTypes.INTEGER, allowNull: true },
      eventTimeStamp: DataTypes.INTEGER,
      round: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'fixture',
    },
  );
  return fixture;
};
