const AlreadyExistsError = require('./alreadyExistsError');

class UserNameAlreadyExistsError extends AlreadyExistsError {
  constructor() {
    super('username');
  }
}

module.exports = UserNameAlreadyExistsError;
