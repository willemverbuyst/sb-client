const isValidFixtureStatus = require('./fixtureStatus.validator');
const isValidLoginInput = require('./loginInput.validator');
const isValidNewPassword = require('./newPassword.validator');
const isValidNewPasswordInput = require('./newPasswordInput.validator');
const isValidPassword = require('./password.validator');
const isValidPasswordConfirm = require('./passwordConfirm.validator');
const isValidPredictionInput = require('./predictionInput.validator');
const isValidSignupInput = require('./signupInput.validator');
const isValidUpdateProfileInput = require('./updateProfileInput.validator');
const isValidUUID = require('./uuid.validator');

module.exports = {
  isValidFixtureStatus,
  isValidLoginInput,
  isValidNewPassword,
  isValidNewPasswordInput,
  isValidPassword,
  isValidPasswordConfirm,
  isValidPredictionInput,
  isValidSignupInput,
  isValidUpdateProfileInput,
  isValidUUID,
};
