const AppError = require('../appError');

class RestrictedError extends AppError {
  constructor() {
    super(`You must be an administrator for this request!`, 403);
  }
}

module.exports = RestrictedError;
