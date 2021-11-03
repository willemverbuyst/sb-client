const AppError = require('../appError');

class NotAUserError extends AppError {
  constructor() {
    super(`No user found with that email address and password!`, 401);
  }
}

module.exports = NotAUserError;
