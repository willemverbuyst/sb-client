const bcrypt = require('bcrypt');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const Team = require('../models').team;
const User = require('../models').user;
const { chunkArrayTotoRounds } = require('../utils/helper-functions');
const calcScores = require('../utils/calc-scores');

const deleteUserAndHisPrediction = async (id) => {
  const user = await User.destroy({ where: { id } });
  await Prediction.destroy({ where: { userId: id } });

  return user;
};

const getUserById = async (id) =>
  await User.findOne({
    where: { id: +id },
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
    raw: true,
    nest: true,
  });

const getUsers = async () =>
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
    totaalToto,
    teamId,
  });

const getUserByEmail = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

module.exports = {
  createNewUser,
  deleteUserAndHisPrediction,
  getUserById,
  getUserByEmail,
  getUsers,
};
