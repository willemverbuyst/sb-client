const NotFoundServerError = require('./notFoundServerError');

class NoTeamsFoundError extends NotFoundServerError {
  constructor() {
    super('teams');
  }
}

module.exports = NoTeamsFoundError;
