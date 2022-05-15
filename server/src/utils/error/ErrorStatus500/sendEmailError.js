const AppError = require('../appError');

class SendEmailError extends AppError {
  constructor() {
    super(`There was an error sending the email. Please try again later.`, 500);
  }
}

module.exports = SendEmailError;
