const express = require('express');
const corsMiddleWare = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { errorHandlers } = require('./utils');
const fixtureRouter = require('./api/routes/fixtureRoutes');
const playerRouter = require('./api/routes/playerRoutes');
const predictionRouter = require('./api/routes/predictionRoutes');
const scoreRouter = require('./api/routes/scoreRoutes');
const teamRouter = require('./api/routes/teamRoutes');
const userRouter = require('./api/routes/userRoutes');
const getFixtures = require('./db/api-football/fixtures');
const { errorControllers } = require('./api/controllers');

const { AppError } = errorHandlers;
const { errorController } = errorControllers;

const app = express();

app.use(helmet());
app.use(corsMiddleWare());

// For development
console.log(`Environment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests for this IP, please try again in an hour',
});
app.use('/api', limiter);

getFixtures();

// Body parser middleware
app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use(xss());

app.use((_res, req, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// This is to simulate a delay from the server during development
if (process.env.NODE_ENV === 'development')
  app.use((_req, _res, next) => {
    setTimeout(() => next(), Number(process.env.DELAY));
  });

app.use('/api/v1/fixtures', fixtureRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/predictions', predictionRouter);
app.use('/api/v1/scores', scoreRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;
