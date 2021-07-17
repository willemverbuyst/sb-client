const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;

const { chunkArrayTotoRounds } = require('../utils/helper-functions');
const calcScores = require('../utils/calc-scores');

const createPrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  userId,
  fixtureId,
) =>
  await Prediction.create({
    pGoalsHomeTeam: +pGoalsHomeTeam,
    pGoalsAwayTeam: +pGoalsAwayTeam,
    userId,
    fixtureId: +fixtureId,
  });

const getPredictionsAndScoresPastFixtures = async (id) => {
  const fixturesWithPrediction = await Fixture.findAll({
    include: {
      model: Prediction,
      where: { userId: id },
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

  // Public: set predictions to null when match is not played yet
  const fixturesWithHiddenPredictions = fixturesGroupedByTotoRounds.map(
    (totoround) =>
      totoround.map((round) =>
        round.map((fixture) => {
          if (fixture.status !== 'Match Finished') {
            return {
              ...fixture,
              predictions: {
                pGoalsAwayTeam: null,
                pGoalsHomeTeam: null,
              },
            };
          } else {
            return fixture;
          }
        }),
      ),
  );

  return fixturesWithHiddenPredictions;
};

module.exports = { createPrediction, getPredictionsAndScoresPastFixtures };
