const NotFoundServerError = require('./notFoundServerError');

class NoPlayersFoundError extends NotFoundServerError {
  constructor() {
    super('players');
  }
}

module.exports = NoPlayersFoundError;
