const AppError = require('../../utils/appError');

module.exports = (role) => (req, _res, next) => {
  if (!req.user[role] === true) {
    return next(new AppError('Je moet een admin zijn voor dit verzoek!', 403));
  }

  next();
};
