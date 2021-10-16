const { userQueries } = require('../../queries');
const { asyncHandler, errorHandlers, validators } = require('../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { createUserQuery } = userQueries;
const { signupInputValidator } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const { userName, firstName, lastName, email, phoneNumber, teamId } =
    req.body;

  if (
    !signupInputValidator(
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      teamId,
    )
  ) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const newPlayer = await createUserQuery(req.body);

  res.status(201).json({
    status: 'success',
    data: { player: newPlayer },
    message: `Er is een nieuw account gemaakt voor ${newPlayer.dataValues.userName}.`,
  });
});
