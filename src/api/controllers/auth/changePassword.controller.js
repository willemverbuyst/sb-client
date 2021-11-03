const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ConfirmPasswordError,
  DetailsMissingError,
  OldAndNewPasswordError,
  WrongPasswordError,
} = errorHandlers;
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
    next(new WrongPasswordError());
  }

  if (!isValidNewPassword(newPassword, currentPassword)) {
    return next(new OldAndNewPasswordError());
  }

  if (!isValidPasswordConfirm(newPassword, confirmPassword)) {
    return next(new ConfirmPasswordError());
  }

  await updateUserPasswordQuery(newPassword, req.user);

  return res.status(200).send({
    status: 'success',
    data: null,
    message: 'Je wachtwoord is gewijzigd.',
  });
});
