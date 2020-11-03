require('dotenv').config();
const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const { PORT } = require('./config/constants');
const devRouter = require('./routers/development');
const authRouter = require('./routers/auth');
const app = express();
const bodyParserMiddleWare = express.json();

/* Call getTeams once, to get all the teams and seed the favteam_table */
/* timestamp: 02-11-2020 16:27 */
// const teams = require('./api/bc_favteams');
// teams.getTeams();

/* Call getTFixtures to get all the fixtures and seed the fixtures_table */
/* timestamp: 03-11-2020 17:00 */
const fixtures = require('./api/bc_fixtures');
fixtures.getFixtures();

app.use(loggerMiddleWare('dev'));
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

if (process.env.DELAY)
  app.use((_req, _res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });

app.use('/', authRouter);

/* For development only, to test queries */
app.use('/dev', devRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
