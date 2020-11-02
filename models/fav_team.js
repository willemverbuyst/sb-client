'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fav_team extends Model {
    static associate(models) {
      team.hasMany(models.user);
    }
  }
  fav_team.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'fav_team',
    }
  );
  return fav_team;
};
