const AppError = require('../appError');

class InvalidOrExpiredTokenError extends AppError {
  constructor() {
    super(`Token is invalid or has expired!`, 401);
  }
}

module.exports = InvalidOrExpiredTokenError;
