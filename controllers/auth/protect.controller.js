const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { getUserByEmail } = require('../../queries/userQuery');

module.exports = catchAsync(async (req, res, next) => {
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
