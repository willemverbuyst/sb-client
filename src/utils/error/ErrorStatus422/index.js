const ConfirmPasswordError = require('./confirmPasswordError');
const InvalidOrMissingInputError = require('./invalidOrMissingInput');
const EmailAlreadyExistsError = require('./emailAlreadyExistsError');
const InvalidEmailError = require('./invalidEmailError');
const InvalidFixtureIdError = require('./invalidFixtureIdError');
const InvalidPlayerIdlError = require('./invalidPlayerIdError');
const InvalidRoundNumberError = require('./invalidRoundNumberError');
const InvalidTeamIdError = require('./invalidTeamIdError');
const InvalidTotoRoundNumberError = require('./invalidTotoRoundNumberError');
const OldAndNewPasswordError = require('./oldAndNewPassordError');
const UniqueConstraintError = require('./uniqueConstraintError');
const UserNameAlreadyExistsError = require('./userNameAlreadyExistsError');
const WrongPasswordError = require('./wrongPasswordError');

module.exports = {
  ConfirmPasswordError,
  InvalidOrMissingInputError,
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFixtureIdError,
  InvalidPlayerIdlError,
  InvalidRoundNumberError,
  InvalidTeamIdError,
  InvalidTotoRoundNumberError,
  OldAndNewPasswordError,
  UniqueConstraintError,
  UserNameAlreadyExistsError,
  WrongPasswordError,
};
