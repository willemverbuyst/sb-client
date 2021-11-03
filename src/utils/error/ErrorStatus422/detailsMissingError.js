const AppError = require('../appError');

class DetailsMissingError extends AppError {
  constructor() {
    super('Details are missing, try again!', 422);
  }
}

module.exports = DetailsMissingError;
