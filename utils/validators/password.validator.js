const bcrypt = require('bcrypt');

const validatePassword = (user, password) =>
  !!user &&
  !!password &&
  !!user.password &&
  bcrypt.compareSync(password, user.password);

module.exports = validatePassword;
