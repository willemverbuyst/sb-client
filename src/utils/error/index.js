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
const LoginError = require('./unAuthorizedError/loginError');
const NoPlayersFoundError = require('./serverError/noPlayersFoundError');
const NotAUserError = require('./unAuthorizedError/notAUserError');
const NoTeammsFoundError = require('./serverError/noTeamsFoundError');
const NotFoundError = require('./notFoundError/notFoundError');
const NoUserWithTokenError = require('./unAuthorizedError/noUserWithTokenError');
const OldAndNewPasswordError = require('./invalidError/oldAndNewPassordError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const RestrictedError = require('./forbiddenError/restrictedError');
const SendEmailError = require('./serverError/sendEmailError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');
const UniqueConstraintError = require('./invalidError/uniqueConstraintError');
const UserNotFoundError = require('./notFoundError/userNotfoundError');
const WrongPasswordError = require('./invalidError/wrongPasswordError');

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
  LoginError,
  NoPlayersFoundError,
  NotAUserError,
  NoTeammsFoundError,
  NotFoundError,
  NoUserWithTokenError,
  OldAndNewPasswordError,
  PlayerNotFoundError,
  RestrictedError,
  SendEmailError,
  TeamNotFoundError,
  UniqueConstraintError,
  UserNotFoundError,
  WrongPasswordError,
};
