const AppError = require('../appError');

class InvalidOrMissingInputError extends AppError {
  constructor() {
    super('Input is missing or invalid!', 422);
  }
}

module.exports = InvalidOrMissingInputError;
