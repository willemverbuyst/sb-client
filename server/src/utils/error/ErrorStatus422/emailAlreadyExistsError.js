const AlreadyExistsError = require('./alreadyExistsError');

class EmailAlreadyExistsError extends AlreadyExistsError {
  constructor() {
    super('email');
  }
}

module.exports = EmailAlreadyExistsError;
