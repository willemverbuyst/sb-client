const { errorHandlers } = require('../../../utils');

const {
  ErrorStatus401: { ExpiredTokenError, InvalidTokenError },
  ErrorStatus422: { UniqueConstraintError },
} = errorHandlers;

const handleUniqueConstraintError = (err) => new UniqueConstraintError(err);

const handleJWTError = () => new InvalidTokenError();

const handleJWTExpiredError = () => new ExpiredTokenError();

const sendErrorProduction = (err, res) => {
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

const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);
    if (error.name === 'SequelizeUniqueConstraintError') {
      error = handleUniqueConstraintError(error);
    }
    if (error.name === 'JsonwebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProduction(error, res);
  }
};
