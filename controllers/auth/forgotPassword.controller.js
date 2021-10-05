const crypto = require('crypto');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
  getUserByEmail,
  handlePasswordReset,
  handlePasswordResetError,
} = require('../../queries/userQuery');
const sendEmail = require('../../utils/email');

const createPasswordResetToken = async (email) => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, passwordResetToken);
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await handlePasswordReset(passwordResetExpires, passwordResetToken, email);

  return resetToken;
};

module.exports = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Get user based on posted email
  const user = await getUserByEmail(email);

  if (!user) {
    next(new AppError('There is no user with that email address', 404));
  }

  const resetToken = await createPasswordResetToken(email);

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to \n${resetURL}.\nIf you didn't forget your password, please ignore this email. `;

  try {
    await sendEmail({
      email: email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    await handlePasswordResetError(email);

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});
