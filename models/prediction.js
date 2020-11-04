'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prediction extends Model {
    static associate(models) {
      prediction.belongsTo(models.user);
      prediction.belongsTo(models.fixture);
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
