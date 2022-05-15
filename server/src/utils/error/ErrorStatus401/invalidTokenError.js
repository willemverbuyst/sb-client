const AppError = require('../appError');

class InvalidTokenError extends AppError {
  constructor() {
    super(`Invalid token, please log in again!`, 401);
  }
}

module.exports = InvalidTokenError;
