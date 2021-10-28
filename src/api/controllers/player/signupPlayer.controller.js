const { teamQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getTeamById } = teamQueries;
const { createUserQuery, getUserByEmailQuery, getUserByUserNameQuery } =
  userQueries;
const { isValidEmail, isValidSignupInput } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    totaalToto,
    teamId,
  } = req.body;

  if (
    !isValidSignupInput(
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      totaalToto,
      teamId,
    )
  ) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  if (!isValidEmail(email)) {
    return next(new AppError('This is not a valid email!'), 400);
  }

  const userByemail = await getUserByEmailQuery(email);

  if (userByemail && userByemail.email) {
    return next(
      new AppError(
        'A user with that email alreay exists, email should be unique!',
      ),
      400,
    );
  }

  const userByUserName = await getUserByUserNameQuery(userName);

  if (userByUserName && userByUserName.userName) {
    return next(
      new AppError(
        'A user with that username alreay exists, username should be unique!',
      ),
      400,
    );
  }

  const team = await getTeamById(teamId);

  if (!team) {
    return next(new AppError('Team with this id not found!'), 400);
  }

  const newPlayer = await createUserQuery(req.body);

  delete newPlayer.dataValues.password;

  res.status(201).json({
    status: 'success',
    data: { player: newPlayer },
    message: `A new account is made for ${newPlayer.dataValues.userName}.`,
  });
});
