const Team = require('../../models').team;
const User = require('../../models').user;

module.exports = async (email) =>
  await User.findOne({
    where: { email },
    attributes: [
      'id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'password',
      'phoneNumber',
      'admin',
      'totaalToto',
    ],
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });
