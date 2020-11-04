'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fixture extends Model {
    static associate(models) {
      // define association here
    }
  }
  fixture.init(
    {
      homeTeamId: { type: DataTypes.INTEGER, allowNull: false },
      homeTeamName: { type: DataTypes.INTEGER, allowNull: false },
      homeTeamLogo: DataTypes.STRING,
      goalsHomeTeam: DataTypes.INTEGER,
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamName: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamLogo: DataTypes.STRING,
      goalsAwayTeam: DataTypes.INTEGER,
      eventTimeStamp: DataTypes.INTEGER,
      round: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'fixture',
    }
  );
  return fixture;
};
