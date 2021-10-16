const jwt = require('jsonwebtoken');
const { fixtureQueries, userQueries } = require('../../queries');
const { asyncHandler, errorHandlers, validators } = require('../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery, getUserByTokenQuery, updateUserPasswordQuery } =
  userQueries;
const { passwordConfirmValidator } = validators;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, next) => {
  const temporaryToken = req.params.token;
  const { password } = req.body;
  const { passwordConfirm } = req.body;
  // Get user based on token
  const userByToken = await getUserByTokenQuery(temporaryToken);

  // If token has not expired and there is a user
  // then set new password
  if (!userByToken) {
    next(new AppError('Token is invalid or has expired', 400));
  }

  if (!passwordConfirmValidator(password, passwordConfirm)) {
    next(new AppError('Passwords are not the same!', 400));
  }

  await updateUserPasswordQuery(password, userByToken);

  // Log in user, send JWT
  const user = await getUserByEmailQuery(userByToken.email);
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
