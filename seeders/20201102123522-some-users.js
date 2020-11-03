'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          userName: 'user_p',
          firstName: 'Pascal',
          lastName: 'Duin',
          email: 'pascal@pascal.com',
          password: bcrypt.hashSync('pascal123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: true,
          totaalToto: true,
          teamId: 194,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'user_r',
          firstName: 'Rick',
          lastName: 'Wolt',
          email: 'rick@rick.com',
          password: bcrypt.hashSync('rick123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 206,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
