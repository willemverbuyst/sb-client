const authControllers = require('./auth');
const errorControllers = require('./error');
const fixtureControllers = require('./fixture');
const playerControllers = require('./player');
const predictionControllers = require('./prediction');
const scoreControllers = require('./score');
const teamControllers = require('./team');
const userControllers = require('./user');

module.exports = {
  authControllers,
  errorControllers,
  fixtureControllers,
  playerControllers,
  predictionControllers,
  scoreControllers,
  teamControllers,
  userControllers,
};
