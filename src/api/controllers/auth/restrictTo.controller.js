const { errorHandlers } = require('../../../utils');

const { AppError } = errorHandlers;

module.exports = (role) => (req, _res, next) => {
  if (!req.user[role] === true) {
    return next(
      new AppError('You need to be an administrator for this rquest!', 403),
    );
  }

  next();
};
