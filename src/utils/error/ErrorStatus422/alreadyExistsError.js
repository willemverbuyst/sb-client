const AppError = require('../appError');

class AlreadyExistsError extends AppError {
  constructor(object) {
    super(
      `A user with that ${object} already exsits, ${object} should be unique!`,
      422,
    );
  }
}

module.exports = AlreadyExistsError;
