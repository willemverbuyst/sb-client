const AppError = require('../appError');

class NoUserWithTokenError extends AppError {
  constructor() {
    super(
      `The user with this token does not exist anymore. Log in and try again!`,
      401,
    );
  }
}

module.exports = NoUserWithTokenError;
