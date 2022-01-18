const bcrypt = require('bcrypt');

module.exports = (newPassword, currentPassword) =>
  !!newPassword &&
  !!currentPassword &&
  typeof newPassword === 'string' &&
  typeof currentPassword === 'string' &&
  !bcrypt.compareSync(newPassword, currentPassword);
