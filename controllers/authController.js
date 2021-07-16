const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { toJWT } = require('../auth/jwt');
const { getUserByEmail, createNewUser } = require('../queries/userQuery');
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

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.user.admin) {
    return next(new AppError('Je moet een admin zijn voor dit verzoek!'), 403);
  }

  // if (
  //   !userName ||
  //   !firstName ||
  //   !lastName ||
  //   !email ||
  //   !password ||
  //   !phoneNumber ||
  //   !teamId
  // ) {
  //   return next(new AppError('Details ontbreken, probeer opnieuw!'), 400);
  // }

  const newUser = await createNewUser(req.body);

  // } catch (error) {
  //   if (error.name === 'SequelizeUniqueConstraintError')
  //     return res
  //       .status(400)
  //       .send({ message: 'Er is al een account met dit emailadres.' });

  //   return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  // }

  const token = toJWT({ userId: newUser.email });

  res.status(201).json({
    status: 'success',
    data: { user: newUser },
    message: `Er is een nieuw account gemaakt voor ${newUser.dataValues.userName}.`,
    token,
  });
});
