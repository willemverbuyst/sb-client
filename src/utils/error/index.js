const AppError = require('./appError');
const BettingClosedError = require('./forbiddenError/bettingClosedError');
const ConfirmPasswordError = require('./invalidError/confirmPasswordError');
const DetailsMissingError = require('./invalidError/detailsMissingError');
const FixtureNotFoundError = require('./notFoundError/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');
const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');
const InvalidTotoRoundNumberError = require('./invalidError/invalidTotoRoundNumberError');
const NoPlayersFoundError = require('./serverError/noPlayersFoundError');
const NotAUserError = require('./unAuthorizedError/notAUserError');
const NoTeammsFoundError = require('./serverError/noTeamsFoundError');
const NotFoundError = require('./notFoundError/notFoundError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const RestrictedError = require('./forbiddenError/restrictedError');
const SendEmailError = require('./serverError/sendEmailError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');
const UserNotFoundError = require('./notFoundError/userNotfoundError');

module.exports = {
  AppError,
  BettingClosedError,
  ConfirmPasswordError,
  DetailsMissingError,
  FixtureNotFoundError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidInputError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTotoRoundNumberError,
  NoPlayersFoundError,
  NotAUserError,
  NoTeammsFoundError,
  NotFoundError,
  PlayerNotFoundError,
  RestrictedError,
  SendEmailError,
  TeamNotFoundError,
  UserNotFoundError,
};
