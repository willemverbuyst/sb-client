const AppError = require('../appError');

class ExpiredTokenError extends AppError {
  constructor() {
    super(`Your token has expired, please log in again!`, 401);
  }
}

module.exports = ExpiredTokenError;
