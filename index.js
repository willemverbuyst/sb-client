require('dotenv').config();

const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const authRouter = require('./routers/auth');
const predictionRouter = require('./routers/predictions');
const roundRouter = require('./routers/rounds');
const scoreRouter = require('./routers/scores');

const app = express();
const bodyParserMiddleWare = express.json();

app.use(corsMiddleWare());

/* Call getTeams once, to get all the teams and seed the team_table */
// const teams = require('./api/bc_teams');
// teams.getTeams();

/* Call getTFixtures to get all the fixtures and seed the fixtures_table */
// const fixtures = require('./api/bc_fixtures');
// fixtures.getFixtures();

app.use(loggerMiddleWare('dev'));
app.use(bodyParserMiddleWare);

/* this to simulate a delay from the server during development */
// if (process.env.DELAY)
//   app.use((_req, _res, next) => {
//     setTimeout(() => next(), parseInt(process.env.DELAY));
//   });

app.use('/', authRouter);
app.use('/predictions', predictionRouter);
app.use('/rounds', roundRouter);
app.use('/scores', scoreRouter);

module.exports = app;
