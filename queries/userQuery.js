const bcrypt = require('bcrypt');
const Team = require('../models').team;
const User = require('../models').user;

const getAllUsers = async () =>
  await User.findAll({
    attributes: [
      'id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'admin',
      'totaalToto',
    ],
    include: [
      {
        model: Team,
        attributes: ['id', 'logo', 'name'],
      },
    ],
  });

const createNewUser = async ({
  userName,
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  admin,
  totaalToto,
  teamId,
}) =>
  await User.create({
    userName,
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS)),
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  });

const getUserByEmail = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

module.exports = { getAllUsers, createNewUser, getUserByEmail };
