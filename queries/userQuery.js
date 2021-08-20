const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Prediction = require('../models').prediction;
const Team = require('../models').team;
const User = require('../models').user;

const deleteUserAndHisPrediction = async (id) => {
  await Prediction.destroy({ where: { userId: id } });
  const user = await User.destroy({ where: { id } });

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
      password: bcrypt.hashSync(
        'EliudKipchoge',
        Number(process.env.SALT_ROUNDS),
      ),
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
  ).then((createdUser) => createdUser.reload());

const getUserByEmail = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

const getUserByToken = async (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  return await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });
};

const handlePasswordReset = async (
  passwordResetExpires,
  passwordResetToken,
  email,
) => {
  await await User.update(
    { passwordResetExpires, passwordResetToken },
    { where: { email } },
  );
};

const handlePasswordResetError = async (email) => {
  await await User.update(
    { passwordResetExpires: null, passwordResetToken: null },
    { where: { email } },
  );
};

const updateUserPassword = async (newPassword, user) =>
  await user.update({
    password: bcrypt.hashSync(newPassword, Number(process.env.SALT_ROUNDS)),
    passwordChangedAt: Date.now() - 1000,
    passwordResetToken: null,
    passwordResetExpires: null,
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
  return await getUserById(updatedUser[1].dataValues.id);
};

module.exports = {
  createNewUser,
  deleteUserAndHisPrediction,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByToken,
  handlePasswordReset,
  handlePasswordResetError,
  updateUserPassword,
  updateUserProfile,
};
