'use strict';

const bcrypt = require('bcrypt');

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          userName: 'Pascal',
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
      ],
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
