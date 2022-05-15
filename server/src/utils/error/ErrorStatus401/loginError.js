const AppError = require('../appError');

class LoginError extends AppError {
  constructor() {
    super(`You are not logged in!`, 401);
  }
}

module.exports = LoginError;
