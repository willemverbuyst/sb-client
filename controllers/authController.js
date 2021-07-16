const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { toJWT } = require('../auth/jwt');
const { getUserByEmail } = require('../queries/userQuery');
const { getCurrentRoundForUser } = require('../queries/roundQuery');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await getUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }

  const currentRound = await getCurrentRoundForUser(user.id);
  const token = toJWT({ userId: user.email });

  res.status(200).json({
    status: 'success',
    data: {
      currentRound,
      user,
    },
    message: `Welcome back ${user.userName}`,
    token,
  });
});
