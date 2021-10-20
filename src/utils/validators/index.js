const isValidFixtureStatus = require('./fixtureStatus.validator');
const isValidLoginInput = require('./loginInput.validator');
const isValidNewPassword = require('./newPassword.validator');
const isValidNewPasswordInput = require('./newPasswordInput.validator');
const isValidPassword = require('./password.validator');
const isValidPasswordConfirm = require('./passwordConfirm.validator');
const isValidPredictionInput = require('./predictionInput.validator');
const isValidSignupInput = require('./signupInput.validator');
const isvalidUpdateProfileInput = require('./updateProfileInput.validator');

module.exports = {
  isValidFixtureStatus,
  isValidLoginInput,
  isValidNewPassword,
  isValidNewPasswordInput,
  isValidPassword,
  isValidPasswordConfirm,
  isValidPredictionInput,
  isValidSignupInput,
  isvalidUpdateProfileInput,
};
