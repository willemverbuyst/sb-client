const User = require('../../models').user;
const getUserById = require('./getUserById.query');

module.exports = async (
  id,
  { userName, firstName, lastName, email, phoneNumber, totaalToto, teamId },
) => {
  const updatedUser = await User.update(
    {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      totaalToto,
      teamId,
    },
    {
      where: { id },
      returning: true,
      plain: true,
    },
  );
  return await getUserById(updatedUser[1].dataValues.id);
};
