const AppError = require('../appError');

class ConfirmPasswordError extends AppError {
  constructor() {
    super(`Your new password and confirm password are not the same!`, 422);
  }
}

module.exports = ConfirmPasswordError;
