const InvalidInputError = require('./invalidInputError');

class InvalidEmailError extends InvalidInputError {
  constructor() {
    super('email address');
  }
}

module.exports = InvalidEmailError;
