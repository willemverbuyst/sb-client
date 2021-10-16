const bcrypt = require('bcrypt');

const validateNewPassword = (newPassword, currentPassword) =>
  !!newPassword &&
  !!currentPassword &&
  typeof newPassword === 'string' &&
  typeof currentPassword === 'string' &&
  !bcrypt.compareSync(newPassword, currentPassword);

module.exports = validateNewPassword;
