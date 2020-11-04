'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prediction extends Model {
    static associate(models) {
      // define association here
    }
  }
  prediction.init(
    {
      predGoalsHomeTeam: { type: DataTypes.INTEGER, allowNull: false },
      predGoalsAwayTeam: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'prediction',
    }
  );
  return prediction;
};
