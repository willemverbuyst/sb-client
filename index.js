require('dotenv').config();
const { PORT } = require('./config/constants');
const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const authRouter = require('./routers/auth');
const predictionRouter = require('./routers/predictions');
const roundRouter = require('./routers/rounds');
const scoreRouter = require('./routers/scores');
const teamRouter = require('./routers/teams');
const userRouter = require('./routers/users');

const app = express();
const bodyParserMiddleWare = express.json();

/* Call getTeams once, to get all the teams and seed the team_table */
// const teams = require('./api/bc_teams');
// teams.getTeams();

/* Call getTFixtures to get all the fixtures and seed the fixtures_table */
// const fixtures = require('./api/bc_fixtures');
// fixtures.getFixtures();

app.use(loggerMiddleWare('dev'));
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

if (process.env.DELAY)
  app.use((_req, _res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });

app.use('/', authRouter);
app.use('/predictions', predictionRouter);
app.use('/rounds', roundRouter);
app.use('/scores', scoreRouter);
app.use('/teams', teamRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
