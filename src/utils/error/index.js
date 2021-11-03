const AppError = require('./appError');
const BettingClosedError = require('./unAuthorizedError/bettingClosedError');
const DetailsMissingError = require('./detailsMissingError');
const FixtureNotFoundError = require('./notFoundError/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');
const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');
const InvalidTotoRoundNumberError = require('./invalidError/invalidTotoRoundNumberError');
const NotFoundError = require('./notFoundError/notFoundError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');
const UserNotFoundError = require('./notFoundError/userNotfoundError');

module.exports = {
  AppError,
  BettingClosedError,
  DetailsMissingError,
  FixtureNotFoundError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidInputError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTotoRoundNumberError,
  NotFoundError,
  PlayerNotFoundError,
  TeamNotFoundError,
  UserNotFoundError,
};
