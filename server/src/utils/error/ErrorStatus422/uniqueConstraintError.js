const AppError = require('../appError');

class UniqueConstraintError extends AppError {
  constructor(err) {
    super(`Error: ${err.errors[0].message}`, 422);
  }
}

module.exports = UniqueConstraintError;
