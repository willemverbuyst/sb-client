const AppError = require('./appError');
const ConfirmPasswordError = require('./invalidError/confirmPasswordError');
const DetailsMissingError = require('./invalidError/detailsMissingError');
const EmailAlreadyExistsError = require('./invalidError/emailAlreadyExistsError');
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
const NotAUserError = require('./unAuthorizedError/notAUserError');
const NotFoundError = require('./notFoundError/notFoundError');
const NoUserWithTokenError = require('./unAuthorizedError/noUserWithTokenError');
const OldAndNewPasswordError = require('./invalidError/oldAndNewPassordError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');
const UniqueConstraintError = require('./invalidError/uniqueConstraintError');
const UserNameAlreadyExistsError = require('./invalidError/userNameAlreadyExistsError');
const UserNotFoundError = require('./notFoundError/userNotfoundError');
const WrongPasswordError = require('./invalidError/wrongPasswordError');
const ErrorStatus403 = require('./ErrorStatus403');
const ErrorStatus500 = require('./ErrorStatus500');

module.exports = {
  AppError,
  ConfirmPasswordError,
  DetailsMissingError,
  EmailAlreadyExistsError,
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
  NotAUserError,
  NotFoundError,
  NoUserWithTokenError,
  OldAndNewPasswordError,
  PlayerNotFoundError,
  TeamNotFoundError,
  UniqueConstraintError,
  UserNameAlreadyExistsError,
  UserNotFoundError,
  WrongPasswordError,
  ErrorStatus403,
  ErrorStatus500,
};
