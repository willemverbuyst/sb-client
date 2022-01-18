const User = require('../../models').user;
const getUserById = require('./getUserById.query');

module.exports = async (
  id,
  { userName, firstName, lastName, email, phoneNumber, totaalToto, teamId },
) => {
  await User.update(
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
    },
  );
  return await getUserById(id);
};
