const createUserQuery = require('./createUser.query');
const deleteUserAndHisPredictionQuery = require('./deleteUserAndHisPrediction.query');
const getAllUsersQuery = require('./getAllUsers.query');
const getUserByEmailQuery = require('./getUserByEmail.query');
const getUserByIdQuery = require('./getUserById.query');
const getUserByTokenQuery = require('./getUserByToken.query');
const getUserByUserNameQuery = require('./getUserByUserName.query');
const handlePasswordResetQuery = require('./handlePasswordReset.query');
const handlePasswordResetErrorQuery = require('./handlePasswordResetError.query');
const updateUserPasswordQuery = require('./updateUserPassword.query');
const updateUserProfileQuery = require('./updateUserProfile.query');

module.exports = {
  createUserQuery,
  deleteUserAndHisPredictionQuery,
  getAllUsersQuery,
  getUserByEmailQuery,
  getUserByIdQuery,
  getUserByTokenQuery,
  getUserByUserNameQuery,
  handlePasswordResetQuery,
  handlePasswordResetErrorQuery,
  updateUserPasswordQuery,
  updateUserProfileQuery,
};
