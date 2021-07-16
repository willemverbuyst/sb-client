const AppError = require('../utils/appError');

const validateLoginInput = (email, password, next) => {
  if (!email || !password) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }
  return true;
};

module.exports = { validateLoginInput };
