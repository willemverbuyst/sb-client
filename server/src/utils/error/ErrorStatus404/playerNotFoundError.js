const NotFoundError = require('./notFoundError');

class PlayerNotFoundError extends NotFoundError {
  constructor() {
    super('Player', 'id');
  }
}

module.exports = PlayerNotFoundError;
