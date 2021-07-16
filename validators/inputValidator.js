const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');

const validateLoginInput = (email, password, next) => {
  if (!email || !password) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }
  return true;
};

const validatePassword = (user, password, next) => {
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }
  return true;
};

module.exports = { validateLoginInput, validatePassword };
