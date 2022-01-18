const Prediction = require('../../models').prediction;
const User = require('../../models').user;

module.exports = async (id) => {
  await Prediction.destroy({ where: { userId: id } });
  const user = await User.destroy({ where: { id } });

  return user;
};
