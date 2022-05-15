const jwt = require('jsonwebtoken');
const { fixtureQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus401: { InvalidOrExpiredTokenError },
  ErrorStatus422: { ConfirmPasswordError },
} = errorHandlers;
const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery, getUserByTokenQuery, updateUserPasswordQuery } =
  userQueries;
const { isValidPasswordConfirm } = validators;

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
    next(new InvalidOrExpiredTokenError());
  }

  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    next(new ConfirmPasswordError());
  }

  await updateUserPasswordQuery(password, userByToken);

  // Log in user, send JWT
  const user = await getUserByEmailQuery(userByToken.email);

  delete user.dataValues.password;

  const currentRound = await getCurrentRoundForUserQuery(user.id);

  const token = signToken({ userId: user.email });

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
