const Team = require('../../models').team;
const User = require('../../models').user;

module.exports = async (email) =>
  await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });
