const AppError = require('./appError');
const ConfirmPasswordError = require('./invalidError/confirmPasswordError');
const DetailsMissingError = require('./invalidError/detailsMissingError');
const EmailAlreadyExistsError = require('./invalidError/emailAlreadyExistsError');
const FixtureNotFoundError = require('./notFoundError/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');

const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');

const InvalidTotoRoundNumberError = require('./invalidError/invalidTotoRoundNumberError');

const NotFoundError = require('./notFoundError/notFoundError');

const OldAndNewPasswordError = require('./invalidError/oldAndNewPassordError');
const PlayerNotFoundError = require('./notFoundError/playerNotFoundError');
const TeamNotFoundError = require('./notFoundError/teamNotFoundError');
const UniqueConstraintError = require('./invalidError/uniqueConstraintError');
const UserNameAlreadyExistsError = require('./invalidError/userNameAlreadyExistsError');
const UserNotFoundError = require('./notFoundError/userNotfoundError');
const WrongPasswordError = require('./invalidError/wrongPasswordError');
const ErrorStatus401 = require('./ErrorStatus401');
const ErrorStatus403 = require('./ErrorStatus403');
const ErrorStatus500 = require('./ErrorStatus500');

module.exports = {
  AppError,
  ConfirmPasswordError,
  DetailsMissingError,
  EmailAlreadyExistsError,

  FixtureNotFoundError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidInputError,

  InvalidPlayerIdlError,
  InvalidRoundNumberError,

  InvalidTotoRoundNumberError,

  NotFoundError,

  OldAndNewPasswordError,
  PlayerNotFoundError,
  TeamNotFoundError,
  UniqueConstraintError,
  UserNameAlreadyExistsError,
  UserNotFoundError,
  WrongPasswordError,
  ErrorStatus401,
  ErrorStatus403,
  ErrorStatus500,
};
