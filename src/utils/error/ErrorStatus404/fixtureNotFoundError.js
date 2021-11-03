const NotFoundError = require('./notFoundError');

class FixtureNotFoundError extends NotFoundError {
  constructor() {
    super('Fixture', 'id');
  }
}

module.exports = FixtureNotFoundError;
