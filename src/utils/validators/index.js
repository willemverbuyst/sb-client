const isValidEmail = require('./email.validator');
const isValidFixtureStatus = require('./fixtureStatus.validator');
const isValidLoginInput = require('./loginInput.validator');
const isValidNewPassword = require('./newPassword.validator');
const isValidNewPasswordInput = require('./newPasswordInput.validator');
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
  isValidFixtureStatus,
  isValidLoginInput,
  isValidNewPassword,
  isValidNewPasswordInput,
  isValidPassword,
  isValidPasswordConfirm,
  isValidPredictionInput,
  isValidRoundNumber,
  isValidSignupInput,
  isValidTotoRoundNumber,
  isValidUpdateProfileInput,
  isValidUUID,
};
