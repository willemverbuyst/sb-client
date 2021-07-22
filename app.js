const express = require('express');
const corsMiddleWare = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const fixtureRouter = require('./routes/fixtureRoutes');
const playerRouter = require('./routes/playerRoutes');
const predictionRouter = require('./routes/predictionRoutes');
const scoreRouter = require('./routes/scoreRoutes');
const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(corsMiddleWare());

// For development
console.log(`Environment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

app.use((res, req, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/fixtures', fixtureRouter);
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/predictions', predictionRouter);
app.use('/api/v1/scores', scoreRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
