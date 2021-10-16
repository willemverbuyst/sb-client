const { userQueries } = require('../../queries');
const { asyncHandler, errorHandlers, validators } = require('../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { updateUserPasswordQuery } = userQueries;
const {
  newPasswordInputValidator,
  newPasswordValidator,
  passwordConfirmValidator,
  passwordValidator,
} = validators;

module.exports = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (
    !newPasswordInputValidator(currentPassword, newPassword, confirmPassword)
  ) {
    return next(
      new AppError('Er ontbreken gevens, vul alle wachtwoorden in!'),
      400,
    );
  }

  if (!passwordValidator(req.user, currentPassword)) {
    next(new AppError('Je current password is verkeerd!', 401));
  }

  if (!newPasswordValidator(newPassword, currentPassword)) {
    return next(
      new AppError('Je oude en nieuwe wachtwoord mag niet hetzelfde zijn!'),
      400,
    );
  }

  if (!passwordConfirmValidator(newPassword, confirmPassword)) {
    return next(
      new AppError('Je nieuwe en confirm wachtwoord zijn niet hetzelfde!'),
      400,
    );
  }

  await updateUserPasswordQuery(newPassword, req.user);

  return res.status(200).send({
    status: 'success',
    data: null,
    message: 'Je wachtwoord is gewijzigd.',
  });
});
