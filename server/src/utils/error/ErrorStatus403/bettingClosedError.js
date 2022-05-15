const AppError = require('../appError');

class BettingClosedError extends AppError {
  constructor() {
    super(`This fixture is closed for betting!`, 403);
  }
}

module.exports = BettingClosedError;
