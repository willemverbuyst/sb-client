const jwt = require('jsonwebtoken');
const { fixtureQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError, DetailsMissingError, InvalidEmailError } = errorHandlers;
const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery } = userQueries;
const { isValidEmail, isValidLoginInput, isValidPassword } = validators;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!isValidLoginInput(email, password)) {
    return next(new DetailsMissingError());
  }

  if (!isValidEmail(email)) {
    return next(new InvalidEmailError());
  }

  const user = await getUserByEmailQuery(email);

  if (!user) {
    return next(
      new AppError('No user found with that email address and password!', 401),
    );
  }

  if (!isValidPassword(user, password)) {
    return next(
      new AppError('No user found with that email address and password!', 401),
    );
  }

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
