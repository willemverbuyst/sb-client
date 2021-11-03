const AppError = require('../appError');

class WrongPasswordError extends AppError {
  constructor() {
    super(`The current password is wrong!`, 422);
  }
}

module.exports = WrongPasswordError;
