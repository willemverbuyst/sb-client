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
      goalsHomeTeam: DataTypes.INTEGER,
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamName: { type: DataTypes.STRING, allowNull: false },
      awayTeamLogo: DataTypes.TEXT,
      goalsAwayTeam: DataTypes.INTEGER,
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
