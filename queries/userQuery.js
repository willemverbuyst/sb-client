const Team = require('../models').team;
const User = require('../models').user;

const getUserByEmail = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

module.exports = { getUserByEmail };
