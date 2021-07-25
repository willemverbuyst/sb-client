const bcrypt = require('bcrypt');
const Prediction = require('../models').prediction;
const Team = require('../models').team;
const User = require('../models').user;

const deleteUserAndHisPrediction = async (id) => {
  const user = await User.destroy({ where: { id } });
  await Prediction.destroy({ where: { userId: id } });

  return user;
};

const getUserById = async (id) =>
  await User.findOne({
    where: { id: id },
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
  totaalToto,
  teamId,
}) =>
  await User.create(
    {
      userName,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS)),
      phoneNumber,
      totaalToto,
      teamId,
    },
    {
      include: [
        {
          model: Team,
          attributes: ['id', 'logo', 'name'],
        },
      ],
    },
  );
// ).then((createdUser) => createdUser.reload());

const getUserByEmail = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

const updateUserPassword = async (newPassword, user) =>
  await user.update({
    password: bcrypt.hashSync(newPassword, Number(process.env.SALT_ROUNDS)),
  });

const updateUserProfile = async (
  id,
  { userName, firstName, lastName, email, phoneNumber, totaalToto, teamId },
) => {
  const updatedUser = await User.update(
    {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      totaalToto,
      teamId,
    },
    {
      where: { id },
      returning: true,
      plain: true,
    },
  );
  console.log('email', updatedUser[1].dataValues.email);

  return await getUserById(updatedUser[1].dataValues.id);
};

module.exports = {
  createNewUser,
  deleteUserAndHisPrediction,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserPassword,
  updateUserProfile,
};
