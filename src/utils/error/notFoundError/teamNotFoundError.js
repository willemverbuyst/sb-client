const NotFoundError = require('./notFoundError');

class TeamNotFoundError extends NotFoundError {
  constructor() {
    super('Team', 'id');
  }
}

module.exports = TeamNotFoundError;
