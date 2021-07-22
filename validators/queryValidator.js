const bcrypt = require('bcrypt');

const validateFixtureStatus = (status) =>
  status === 'Match Finished' ? false : true;

const validateNewPassword = (newPassword, oldPassword) =>
  bcrypt.compareSync(newPassword, oldPassword) ? false : true;

const validateUser = (user) => user;

module.exports = { validateFixtureStatus, validateNewPassword, validateUser };
