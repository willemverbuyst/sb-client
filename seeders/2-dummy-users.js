'use strict';

const bcrypt = require('bcrypt');

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          userName: 'Rick',
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
          totaalToto: false,
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
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
