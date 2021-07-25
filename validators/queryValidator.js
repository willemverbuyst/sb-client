const bcrypt = require('bcrypt');

const validateFixtureStatus = (status) => status !== 'Match Finished';

const validateNewPassword = (newPassword, oldPassword) =>
  !bcrypt.compareSync(newPassword, oldPassword);

const validateUser = (user) => user;

module.exports = { validateFixtureStatus, validateNewPassword, validateUser };
