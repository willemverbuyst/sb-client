const bcrypt = require('bcrypt');

module.exports = async (newPassword, user) =>
  await user.update({
    password: bcrypt.hashSync(newPassword, Number(process.env.SALT_ROUNDS)),
    passwordChangedAt: Date.now() - 1000,
    passwordResetToken: null,
    passwordResetExpires: null,
  });
