const AppError = require('../utils/appError');

const handleGenericErrorDB = (err) => {
  const message = `${err}`;
  return new AppError(message, 400);
};

const handleDuplicateEmail = (err) => {
  const message = 'Er is al een account met dit emailadres.';
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired, please log in again!', 401);

const sendError = (err, res) => {
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error, don't send details to the client
    console.error('ERROR: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.create(err);
  if (error.name === 'SequelizeDatabaseError') {
    error = handleGenericErrorDB(error);
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    error = handleDuplicateEmail(error);
  }
  if (error.name === 'JsonwebTokenError') {
    error = handleJWTError();
  }
  if (error.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  sendError(error, res);
};
