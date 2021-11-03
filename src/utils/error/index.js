const AppError = require('./appError');
const BettingClosedError = require('./forbiddenError/bettingClosedError');
const ConfirmPasswordError = require('./invalidError/confirmPasswordError');
const DetailsMissingError = require('./invalidError/detailsMissingError');
const ExpiredTokenError = require('./unAuthorizedError/expiredTokenError');
const FixtureNotFoundError = require('./notFoundError/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');
const InvalidOrExpiredTokenError = require('./unAuthorizedError/invalidOrExpiredTokenError');
const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');
const InvalidTokenError = require('./unAuthorizedError/invalidTokenEror');
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
  ExpiredTokenError,
  FixtureNotFoundError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidInputError,
  InvalidOrExpiredTokenError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTokenError,
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
