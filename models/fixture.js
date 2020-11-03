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
      goalsHomeTeam: DataTypes.INTEGER,
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
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
