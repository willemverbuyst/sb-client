const InvalidInputError = require('./invalidInputError');

class InvalidTotoRoundNumberError extends InvalidInputError {
  constructor() {
    super('totoround number');
  }
}

module.exports = InvalidTotoRoundNumberError;
