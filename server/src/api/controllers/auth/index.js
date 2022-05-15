const changedPasswordController = require('./changePassword.controller');
const forgotPasswordController = require('./forgotPassword.controller');
const loginController = require('./login.controller');
const protectController = require('./protect.controller');
const resetPasswordController = require('./resetPassword.controller');
const restrictToController = require('./restrictTo.controller');
const validTokenController = require('./validToken.controller');

module.exports = {
  changedPasswordController,
  forgotPasswordController,
  loginController,
  protectController,
  resetPasswordController,
  restrictToController,
  validTokenController,
};
