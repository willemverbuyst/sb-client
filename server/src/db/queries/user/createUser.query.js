const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Team = require('../../models').team;
const User = require('../../models').user;
const getUserByEmailQuery = require('./getUserByEmail.query');

module.exports = async ({
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  totaalToto,
  teamId,
}) => {
  await User.create(
    {
      id: uuidv4(),
      userName,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(
        process.env.TEMP_PASSWORD,
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
  );

  const user = await getUserByEmailQuery(email);

  return user;
};
