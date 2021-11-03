const NotFoundServerError = require('./notFoundServerError');

class NoTeammsFoundError extends NotFoundServerError {
  constructor() {
    super('teams');
  }
}

module.exports = NoTeammsFoundError;
