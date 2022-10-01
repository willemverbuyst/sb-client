const bcrypt = require('bcrypt');
const demoUser = require('./demoUser.json');

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const admin = [
  {
    id: 'c915ba49-922e-437c-b773-6bdd741ca047',
    userName: demoUser.userName,
    firstName: demoUser.firstName,
    lastName: demoUser.lastName,
    email: demoUser.email,
    password: bcrypt.hashSync(demoUser.password, SALT_ROUNDS),
    phoneNumber: '0612345678',
    admin: true,
    totaalToto: true,
    teamId: 1118,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
module.exports = admin;
