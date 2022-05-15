const InvalidInputError = require('./invalidInputError');

class InvalidRoundNumberError extends InvalidInputError {
  constructor() {
    super('round number');
  }
}

module.exports = InvalidRoundNumberError;
