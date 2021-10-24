const isValidEmail = require('./email.validator');
const isValidFixtureId = require('./fixtureId.validator');
const isValidFixtureStatus = require('./fixtureStatus.validator');
const isValidLoginInput = require('./loginInput.validator');
const isValidNewPassword = require('./newPassword.validator');
const isValidNewPasswordInput = require('./newPasswordInput.validator');
const isValidOpenToBet = require('./openToBet.validator');
const isValidPassword = require('./password.validator');
const isValidPasswordConfirm = require('./passwordConfirm.validator');
const isValidPredictionInput = require('./predictionInput.validator');
const isValidRoundNumber = require('./roundNumber.validator');
const isValidSignupInput = require('./signupInput.validator');
const isValidTotoRoundNumber = require('./totoRoundNumber.validator');
const isValidUpdateProfileInput = require('./updateProfileInput.validator');
const isValidUUID = require('./uuid.validator');

module.exports = {
  isValidEmail,
  isValidFixtureId,
  isValidFixtureStatus,
  isValidLoginInput,
  isValidNewPassword,
  isValidNewPasswordInput,
  isValidOpenToBet,
  isValidPassword,
  isValidPasswordConfirm,
  isValidPredictionInput,
  isValidRoundNumber,
  isValidSignupInput,
  isValidTotoRoundNumber,
  isValidUpdateProfileInput,
  isValidUUID,
};
