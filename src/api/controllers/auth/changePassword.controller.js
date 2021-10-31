const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError, DetailsMissingError } = errorHandlers;
const { updateUserPasswordQuery } = userQueries;
const {
  isValidNewPassword,
  isValidNewPasswordInput,
  isValidPassword,
  isValidPasswordConfirm,
} = validators;

module.exports = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!isValidNewPasswordInput(currentPassword, newPassword, confirmPassword)) {
    return next(new DetailsMissingError());
  }

  if (!isValidPassword(req.user, currentPassword)) {
    next(new AppError('The current password is wrong!', 422));
  }

  if (!isValidNewPassword(newPassword, currentPassword)) {
    return next(
      new AppError('Your old and new password cannot be the same!'),
      422,
    );
  }

  if (!isValidPasswordConfirm(newPassword, confirmPassword)) {
    return next(
      new AppError('Your new password and confirm password are not the same!'),
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
