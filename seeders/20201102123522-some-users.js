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
        {
          userName: 'Siffy',
          firstName: 'Sifan',
          lastName: 'Hassan',
          email: 'sifan@hassan.com',
          password: bcrypt.hashSync('sifan123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Fjodjee',
          firstName: 'Fjodor',
          lastName: 'Dostojewski',
          email: 'fjodor@dostojewski.com',
          password: bcrypt.hashSync('fjodor123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 195,
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
