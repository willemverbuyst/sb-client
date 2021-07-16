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

exports.signup = catchAsync(async (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  } = req.body;

  if (!req.user.admin) {
    return next(new AppError('Je moet een admin zijn voor dit verzoek!'), 403);
  }

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !teamId
  ) {
    return next(new AppError('Details ontbreken, probeer opnieuw!'), 400);
  }

  try {
    await User.create({
      userName,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      phoneNumber,
      admin,
      totaalToto,
      teamId,
    });

    const newUser = await User.findOne({
      where: { email },
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'admin',
        'totaalToto',
      ],
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    res.status(201).json({
      userData: newUser,
      message: `Er is een nieuw account gemaakt voor ${newUser.dataValues.userName}.`,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return res
        .status(400)
        .send({ message: 'Er is al een account met dit emailadres.' });

    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});
