const AppError = require('./appError');

class NotFoundError extends AppError {
  constructor(object, property) {
    super(`${object} with this ${property} not found!`, 404);
  }
}

module.exports = NotFoundError;
