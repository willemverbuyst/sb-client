const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const { chunkArrayTotoRounds } = require('../../utils/helper.functions');
const { scoreFunctions } = require('../../utils');

const { calculateScore } = scoreFunctions;

module.exports = async (playerId, userId) => {
  const fixturesWithPrediction = await Fixture.findAll({
    where: { round: { [Op.regexp]: '^Regular' } },
    include: [
      {
        model: Prediction,
        where: { userId: playerId },
        attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
        required: false,
      },
    ],
    order: [['id', 'ASC']],
    raw: true,
    nest: true,
  });

  const fixturesWithPredictionAndScore = fixturesWithPrediction.map(
    (fixtureWithPrediction) => ({
      ...fixtureWithPrediction,
      score: calculateScore(
        fixtureWithPrediction.goalsHomeTeam,
        fixtureWithPrediction.goalsAwayTeam,
        fixtureWithPrediction.predictions.pGoalsHomeTeam,
        fixtureWithPrediction.predictions.pGoalsAwayTeam,
      ),
    }),
  );

  const fixturesGroupedByTotoRounds = chunkArrayTotoRounds(
    fixturesWithPredictionAndScore,
  );

  if (Number(playerId) === Number(userId)) {
    return fixturesGroupedByTotoRounds;
  }

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
          }
          return fixture;
        }),
      ),
  );

  return fixturesWithHiddenPredictions;
};
