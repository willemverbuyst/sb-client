const bcrypt = require('bcrypt');

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const admin = [
  {
    id: 'c915ba49-922e-437c-b773-6bdd741ca047',
    userName: 'Sparrow',
    firstName: 'Jack',
    lastName: 'Sparrow',
    email: 'jack@sparrow.com',
    password: bcrypt.hashSync('jack123', SALT_ROUNDS),
    phoneNumber: '0612345678',
    admin: true,
    totaalToto: true,
    teamId: 1118,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
module.exports = admin;
