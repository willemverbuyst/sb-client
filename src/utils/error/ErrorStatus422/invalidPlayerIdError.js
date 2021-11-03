const InvalidInputError = require('./invalidInputError');

class InvalidPlayerIdlError extends InvalidInputError {
  constructor() {
    super('player id');
  }
}

module.exports = InvalidPlayerIdlError;
