const AppError = require('../appError');

class OldAndNewPasswordError extends AppError {
  constructor() {
    super(`Your old and new password cannot be the same!`, 422);
  }
}

module.exports = OldAndNewPasswordError;
