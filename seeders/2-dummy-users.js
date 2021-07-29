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
        {
          userName: 'Jack',
          firstName: 'Jack',
          lastName: 'Sparrow',
          email: 'jack@sparrow.com',
          password: bcrypt.hashSync('jack123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 414,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Gene',
          firstName: 'Gene',
          lastName: 'Simmons',
          email: 'gene@simmons.com',
          password: bcrypt.hashSync('gene123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Ali',
          firstName: 'Ali',
          lastName: 'Aldi',
          email: 'ali@aldi.com',
          password: bcrypt.hashSync('ali123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Jane',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'ali@aldi.com',
          password: bcrypt.hashSync('jane123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'John',
          firstName: 'John',
          lastName: 'Doe',
          email: 'ali@aldi.com',
          password: bcrypt.hashSync('john123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Mark',
          firstName: 'Mark',
          lastName: 'Rutte',
          email: 'ali@aldi.com',
          password: bcrypt.hashSync('rutte123', SALT_ROUNDS),
          phoneNumber: '0612345678',
          admin: false,
          totaalToto: true,
          teamId: 1118,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
