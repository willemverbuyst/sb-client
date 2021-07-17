const user = require('../models/user');

const validateFixtureStatus = (status) =>
  status === 'Match Finished' ? false : true;

const validateUser = (user) => user;

module.exports = { validateFixtureStatus, validateUser };
