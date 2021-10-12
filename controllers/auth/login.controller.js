const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { fixtureQueries, userQueries } = require('../../queries');
const validateLoginInput = require('../../validators/validateLoginInput');
const validatePassword = require('../../validators/validatePassword');

const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery } = userQueries;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateLoginInput(email, password)) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await getUserByEmailQuery(email);

  if (!validatePassword(user, password)) {
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
