const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

console.log(`Environment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((res, req, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
