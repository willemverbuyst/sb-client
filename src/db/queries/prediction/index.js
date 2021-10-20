const createPredictionQuery = require('./createPrediction.query');
const getAllPredictionsAndScoresForFixtureQuery = require('./getAllPredictionsAndScoresForFixture.query');
const getScoresPlayerQuery = require('./getScoresPlayer.query');
const getScoresRoundQuery = require('./getScoresRound.query');
const getScoresTotalTotoQuery = require('./getScoresTotalToto.query');
const getScoresTotoRoundQuery = require('./getScoresTotalToto.query');
const updatePredictionQuery = require('./updatePrediction.query');

module.exports = {
  createPredictionQuery,
  getAllPredictionsAndScoresForFixtureQuery,
  getScoresPlayerQuery,
  getScoresRoundQuery,
  getScoresTotalTotoQuery,
  getScoresTotoRoundQuery,
  updatePredictionQuery,
};
