const InvalidInputError = require('./invalidInputError');

class InvalidFixtureIdError extends InvalidInputError {
  constructor() {
    super('fixture id');
  }
}

module.exports = InvalidFixtureIdError;
