const Team = require('../../models').team;
const User = require('../../models').user;

module.exports = async (id) =>
  await User.findOne({
    where: { id: id },
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
    raw: true,
    nest: true,
  });
