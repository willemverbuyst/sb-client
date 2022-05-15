const User = require('../../models').user;

module.exports = async (email) => {
  await await User.update(
    { passwordResetExpires: null, passwordResetToken: null },
    { where: { email } },
  );
};
