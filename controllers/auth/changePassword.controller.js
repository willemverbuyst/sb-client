const { userQueries } = require('../../queries');
const { asyncHandler, errorHandlers } = require('../../utils');
const validateChangePasswordInput = require('../../validators/validateChangePasswordInput');
const validateNewPassword = require('../../validators/validateNewPassword');
const validatePassword = require('../../validators/validatePassword');
const validatePasswordConfirm = require('../../validators/validatePasswordConfirm');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { updateUserPasswordQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (
    !validateChangePasswordInput(currentPassword, newPassword, confirmPassword)
  ) {
    return next(
      new AppError('Er ontbreken gevens, vul alle wachtwoorden in!'),
      400,
    );
  }

  if (!validatePassword(req.user, currentPassword)) {
    next(new AppError('Je current password is verkeerd!', 401));
  }

  if (!validateNewPassword(newPassword, currentPassword)) {
    return next(
      new AppError('Je oude en nieuwe wachtwoord mag niet hetzelfde zijn!'),
      400,
    );
  }

  if (!validatePasswordConfirm(newPassword, confirmPassword)) {
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
