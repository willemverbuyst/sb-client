const AppError = require('../appError');

class InvalidInputError extends AppError {
  constructor(input) {
    super(`This is not a valid ${input}!`, 422);
  }
}

module.exports = InvalidInputError;
