const ExpiredTokenError = require('./expiredTokenError');
const InvalidOrExpiredTokenError = require('./invalidOrExpiredTokenError');
const InvalidTokenError = require('./invalidTokenEror');
const LoginError = require('./loginError');
const NotAUserError = require('./notAUserError');
const NoUserWithTokenError = require('./noUserWithTokenError');

module.exports = {
  ExpiredTokenError,
  InvalidOrExpiredTokenError,
  InvalidTokenError,
  LoginError,
  NotAUserError,
  NoUserWithTokenError,
};
