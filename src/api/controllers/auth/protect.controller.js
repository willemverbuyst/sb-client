const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getUserByEmailQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  // get token an check if it's there

  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : '';

  if (!token) {
    return next(new AppError('You are not logged in!'), 401);
  }
  // verify token
  const { userId: email } = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // check if user still exists
  const currentUser = await getUserByEmailQuery(email);

  if (!currentUser) {
    return next(
      new AppError(
        'The user with this token does not exist anymore. Log in and try again!',
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
