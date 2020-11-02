require('dotenv').config();
const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const { PORT } = require('./config/constants');
const devRouter = require('./routers/development');
const authRouter = require('./routers/auth');
const app = express();
const bodyParserMiddleWare = express.json();

// Call getTeams once, to get all the teams and seed the fav_table
// const teams = require('./api/bi_fav_teams');
// teams.getTeams();

app.use(loggerMiddleWare('dev'));
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((_req, _res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use('/', authRouter);
app.use('/dev', devRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
