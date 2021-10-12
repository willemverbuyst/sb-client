const bcrypt = require('bcrypt');
const Team = require('../../models').team;
const User = require('../../models').user;

module.exports = async ({
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  totaalToto,
  teamId,
}) =>
  await User.create(
    {
      userName,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(
        'EliudKipchoge',
        Number(process.env.SALT_ROUNDS),
      ),
      phoneNumber,
      totaalToto,
      teamId,
    },
    {
      include: [
        {
          model: Team,
          attributes: ['id', 'logo', 'name'],
        },
      ],
    },
  ).then((createdUser) => createdUser.reload());
