const express = require('express');
const corsMiddleWare = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { AppError } = require('./utils/error');
const fixtureRouter = require('./api/routes/fixtureRoutes');
const playerRouter = require('./api/routes/playerRoutes');
const predictionRouter = require('./api/routes/predictionRoutes');
const scoreRouter = require('./api/routes/scoreRoutes');
const teamRouter = require('./api/routes/teamRoutes');
const userRouter = require('./api/routes/userRoutes');
const getFixtures = require('./db/api-football/fixtures');
const { errorControllers } = require('./api/controllers');

const swaggerDocument = YAML.load('swagger.yml');

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

const { BASE_URL } = process.env;

app.use(`${BASE_URL}/fixtures`, fixtureRouter);
app.use(`${BASE_URL}/players`, playerRouter);
app.use(`${BASE_URL}/predictions`, predictionRouter);
app.use(`${BASE_URL}/scores`, scoreRouter);
app.use(`${BASE_URL}/teams`, teamRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(
  `${BASE_URL}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;
