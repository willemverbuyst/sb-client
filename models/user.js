'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaulValue: 'voornaam',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'achternaam',
      },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'password',
      },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      totaalToto: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
