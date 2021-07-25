const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  getUserByEmail,
  getUserByToken,
  handlePasswordReset,
  handlePasswordResetError,
  updateUserPassword,
} = require('../queries/userQuery');
const { getCurrentRoundForUser } = require('../queries/fixtureQuery');
const {
  validateLoginInput,
  validatePassword,
  validatePasswordConfirm,
  validateUpdatePassword,
} = require('../validators/inputValidator');
const { validateNewPassword } = require('../validators/queryValidator');
const sendEmail = require('../utils/email');

const createPasswordResetToken = async (email) => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, passwordResetToken);
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await handlePasswordReset(passwordResetExpires, passwordResetToken, email);

  return resetToken;
};

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
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

exports.validToken = catchAsync(async (req, res, next) => {
  const user = await getUserByEmail(req.user.email);

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Get user based on posted email
  const user = await getUserByEmail(email);

  if (!user) {
    next(new AppError('There is no user with that email address', 404));
  }

  const resetToken = await createPasswordResetToken(email);

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to \n${resetURL}.\nIf you didn't forget your password, please ignore this email. `;

  try {
    await sendEmail({
      email: email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    await handlePasswordResetError(email);

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
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

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { newPassword } = req.body;

  if (!validateUpdatePassword(newPassword)) {
    return next(new AppError('Vul nieuw wachtwoord in!'), 400);
  }

  if (!validateNewPassword(newPassword, req.user.password)) {
    return next(
      new AppError('Je oude en nieuwe wachtwoord mag niet hetzelfde zijn!'),
      400,
    );
  }

  await updateUserPassword(newPassword, req.user);

  return res.status(200).send({
    status: 'success',
    data: null,
    message: 'Je wachtwoord is gewijzigd.',
  });
});
