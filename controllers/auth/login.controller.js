const jwt = require('jsonwebtoken');
const { fixtureQueries, userQueries } = require('../../queries');
const { asyncHandler, errorHandlers, validators } = require('../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery } = userQueries;
const { loginInputValidator, passwordValidator } = validators;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!loginInputValidator(email, password)) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await getUserByEmailQuery(email);

  if (!passwordValidator(user, password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }

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
