const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { userQueries } = require('../../queries');
const validateUpdateProfileInput = require('../../validators/validateUpdateProfileInput');

const { updateUserProfileQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  const loggedInUserId = Number(req.user.id);
  const { userName, firstName, lastName, email, phoneNumber, teamId } =
    req.body;

  if (
    !validateUpdateProfileInput(
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

  const profile = await updateUserProfileQuery(loggedInUserId, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: { profile },
    },
    message: 'Je profiel is gewijzigd.',
  });
});
