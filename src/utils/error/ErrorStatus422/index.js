const ConfirmPasswordError = require('./confirmPasswordError');
const DetailsMissingError = require('./detailsMissingError');
const EmailAlreadyExistsError = require('./emailAlreadyExistsError');
const InvalidEmailError = require('./invalidFixtureIdError');
const InvalidFixtureIdError = require('./invalidFixtureIdError');
const InvalidPlayerIdlError = require('./invalidPlayerIdError');
const InvalidRoundNumberError = require('./invalidRoundNumberError');
const InvalidTotoRoundNumberError = require('./invalidTotoRoundNumberError');
const OldAndNewPasswordError = require('./oldAndNewPassordError');
const UniqueConstraintError = require('./uniqueConstraintError');
const UserNameAlreadyExistsError = require('./userNameAlreadyExistsError');
const WrongPasswordError = require('./wrongPasswordError');

module.exports = {
  ConfirmPasswordError,
  DetailsMissingError,
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTotoRoundNumberError,
  OldAndNewPasswordError,
  UniqueConstraintError,
  UserNameAlreadyExistsError,
  WrongPasswordError,
};
