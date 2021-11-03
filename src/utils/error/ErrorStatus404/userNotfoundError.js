const NotFoundError = require('./notFoundError');

class UserNotFoundError extends NotFoundError {
  constructor() {
    super('User', 'email address');
  }
}

module.exports = UserNotFoundError;
