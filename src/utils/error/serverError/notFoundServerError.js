const AppError = require('../appError');

class NotFoundServerError extends AppError {
  constructor(object) {
    super(`No ${object} found, please try again later!`, 500);
  }
}

module.exports = NotFoundServerError;
