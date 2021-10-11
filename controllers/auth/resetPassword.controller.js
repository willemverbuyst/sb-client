const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
  getUserByEmail,
  getUserByToken,
  updateUserPassword,
} = require('../../queries/userQuery');
const { fixtureQueries } = require('../../queries');
const validatePasswordConfirm = require('../../validators/validatePasswordConfirm');

const { getCurrentRoundForUserQuery } = fixtureQueries;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, next) => {
  const temporaryToken = req.params.token;
  const { password } = req.body;
  const { passwordConfirm } = req.body;
  // Get user based on token
  const userByToken = await getUserByToken(temporaryToken);

  // If token has not expired and there is a user
  // then set new password
  if (!userByToken) {
    next(new AppError('Token is invalid or has expired', 400));
  }

  if (!validatePasswordConfirm(password, passwordConfirm)) {
    next(new AppError('Passwords are not the same!', 400));
  }

  await updateUserPassword(password, userByToken);

  // Log in user, send JWT
  const user = await getUserByEmail(userByToken.email);
  const currentRound = await getCurrentRoundForUserQuery(user.id);
  const token = signToken({ userId: user.email });
  user.password = '';

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        profile: user,
        currentRound,
      },
    },
    message: `Welcome back ${user.userName}`,
    token,
  });
});
