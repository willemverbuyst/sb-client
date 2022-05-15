const User = require('../../models').user;

module.exports = async (passwordResetExpires, passwordResetToken, email) => {
  await await User.update(
    { passwordResetExpires, passwordResetToken },
    { where: { email } },
  );
};
