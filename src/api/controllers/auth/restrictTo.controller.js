const { errorHandlers } = require('../../../utils');

const { RestrictedError } = errorHandlers;

module.exports = (role) => (req, _res, next) => {
  if (!req.user[role] === true) {
    return next(new RestrictedError());
  }

  next();
};
