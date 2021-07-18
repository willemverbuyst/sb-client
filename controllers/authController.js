const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { getUserByEmail, createNewUser } = require('../queries/userQuery');
const { getCurrentRoundForUser } = require('../queries/fixtureQuery');
const {
  validateLoginInput,
  validatePassword,
  validateSignupInput,
} = require('../validators/inputValidator');

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateLoginInput(email, password)) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await getUserByEmail(email);

  if (!validatePassword(user, password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }

  const currentRound = await getCurrentRoundForUser(user.id);

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

exports.signup = catchAsync(async (req, res, next) => {
  if (!validateSignupInput(req.body)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const newUser = await createNewUser(req.body);

  res.status(201).json({
    status: 'success',
    data: { user: newUser },
    message: `Er is een nieuw account gemaakt voor ${newUser.dataValues.userName}.`,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get token an check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('Je bent niet ingelogd. Log in om de app te gebruiken.'),
      401,
    );
  }
  // verify token
  const { userId: email } = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // check if user still exists
  const currentUser = await getUserByEmail(email);

  if (!currentUser) {
    return next(
      new AppError(
        'De gebruiker met deze token bestaat niet meer, log in en probeer opnieuw.',
        401,
      ),
    );
  }

  // check if the user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password, please log in again.', 401)
  //   );
  // }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (role) => (req, res, next) => {
  if (!req.user[role] === true) {
    return next(new AppError('Je moet een admin zijn voor dit verzoek!', 403));
  }

  next();
};

exports.forgotPassword = (req, res, next) => {};
exports.resetPassword = (req, res, next) => {};
