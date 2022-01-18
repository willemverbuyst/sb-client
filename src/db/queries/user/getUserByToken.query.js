const { Op } = require('sequelize');
const crypto = require('crypto');
const User = require('../../models').user;

module.exports = async (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  return await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });
};
