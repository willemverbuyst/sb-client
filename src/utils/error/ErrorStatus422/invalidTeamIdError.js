const InvalidInputError = require('./invalidInputError');

class InvalidTeamIdError extends InvalidInputError {
  constructor() {
    super('team id');
  }
}

module.exports = InvalidTeamIdError;
