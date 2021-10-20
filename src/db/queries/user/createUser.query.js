const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
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
}) => {
  const newUser = await User.create(
    {
      id: uuidv4(),
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

  return newUser;
};
