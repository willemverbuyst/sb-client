const Team = require('../../models').team;
const User = require('../../models').user;

module.exports = async (userName) =>
  await User.findOne({
    where: { userName },
    attributes: [
      'id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'admin',
      'totaalToto',
    ],
    include: [
      {
        model: Team,
        attributes: ['id', 'logo', 'name'],
      },
    ],
  });
