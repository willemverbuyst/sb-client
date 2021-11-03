const AppError = require('./appError');
const ConfirmPasswordError = require('./invalidError/confirmPasswordError');
const DetailsMissingError = require('./invalidError/detailsMissingError');
const EmailAlreadyExistsError = require('./invalidError/emailAlreadyExistsError');
const FixtureNotFoundError = require('./ErrorStatus404/fixtureNotFoundError');
const InvalidEmailError = require('./invalidError/invalidEmailError');
const InvalidFixtureIdError = require('./invalidError/invalidFixtureIdError');
const InvalidInputError = require('./invalidError/invalidInputError');

const InvalidPlayerIdlError = require('./invalidError/invalidPlayerIdError.');
const InvalidRoundNumberError = require('./invalidError/invalidRoundNumberError');

const InvalidTotoRoundNumberError = require('./invalidError/invalidTotoRoundNumberError');

const OldAndNewPasswordError = require('./invalidError/oldAndNewPassordError');

const UniqueConstraintError = require('./invalidError/uniqueConstraintError');
const UserNameAlreadyExistsError = require('./invalidError/userNameAlreadyExistsError');

const WrongPasswordError = require('./invalidError/wrongPasswordError');
const ErrorStatus401 = require('./ErrorStatus401');
const ErrorStatus403 = require('./ErrorStatus403');
const ErrorStatus404 = require('./ErrorStatus404');
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

  OldAndNewPasswordError,

  UniqueConstraintError,
  UserNameAlreadyExistsError,

  WrongPasswordError,
  ErrorStatus401,
  ErrorStatus403,
  ErrorStatus404,
  ErrorStatus500,
};
