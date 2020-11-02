'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favteam extends Model {
    static associate(models) {
      favteam.hasMany(models.user);
    }
  }
  favteam.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'favteam',
    }
  );
  return favteam;
};
