const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { chunkArrayTotoRounds } = require('../utils/helper-functions');
const calcScores = require('../utils/calc-scores');

const getAllFixturesForLoggedInUser = async (userId) => {
  const fixturesWithPrediction = await Fixture.findAll({
    include: {
      model: Prediction,
      where: { userId },
      attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
      required: false,
    },
    order: [['id', 'ASC']],
    raw: true,
    nest: true,
  });

  const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
    return {
      ...fix,
      score: calcScores(
        { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
        {
          homeTeam: fix.predictions.pGoalsHomeTeam,
          awayTeam: fix.predictions.pGoalsAwayTeam,
        },
      ),
    };
  });

  const fixturesGroupedByTotoRounds = chunkArrayTotoRounds(
    fixturesWithPredictionAndScore,
  );

  return fixturesGroupedByTotoRounds;
};

const getFixture = async (id) => await Fixture.findOne({ where: { id } });

module.exports = { getAllFixturesForLoggedInUser, getFixture };
