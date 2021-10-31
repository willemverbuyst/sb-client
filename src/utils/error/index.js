const AppError = require('./appError');
const DetailsMissingError = require('./detailsMissingError');
const FixtureNotFoundError = require('./notFoundError/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');
const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');
const InvalidTotoRoundNumberError = require('./invalidError/invalidTotoRoundNumberError');
const NotFoundError = require('./notFoundError/notFoundError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');

module.exports = {
  AppError,
  DetailsMissingError,
  FixtureNotFoundError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidInputError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTotoRoundNumberError,
  NotFoundError,
  TeamNotFoundError,
};
