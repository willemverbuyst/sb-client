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
const NoPlayersFoundError = require('./serverError/noPlayersFoundError');
const NoTeammsFoundError = require('./serverError/noTeamsFoundError');
const NotFoundError = require('./notFoundError/notFoundError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const ProductionError = require('./serverError/productionError');
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
  NoPlayersFoundError,
  NoTeammsFoundError,
  NotFoundError,
  PlayerNotFoundError,
  ProductionError,
  TeamNotFoundError,
  UserNotFoundError,
};
