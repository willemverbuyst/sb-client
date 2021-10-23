const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const { helperFunctions, scoreFunctions } = require('../../../utils');

const { chunkArrayTotoRoundsHelper, getLastMondayHelper } = helperFunctions;
const { calculateScore } = scoreFunctions;

module.exports = async (playerId) => {
  const now = new Date(Date.now());
  const timeStampLastMonday = getLastMondayHelper(now);

  const fixtures = await Fixture.findAll({
    where: {
      round: { [Op.regexp]: '^Regular' },
      eventTimeStamp: {
        [Op.lt]: [timeStampLastMonday],
      },
    },
    order: [['id', 'ASC']],
  });

  if (fixtures.length > 0) {
    const fixturesWithPredictions = await Fixture.findAll({
      where: {
        id: {
          [Op.lte]: fixtures[fixtures.length - 1].id,
        },
      },
      include: [
        {
          model: Prediction,
          where: {
            userId: playerId,
          },
          required: false,
        },
      ],
      order: [['id', 'ASC']],
      raw: true,
      nest: true,
    });

    const fixturesWithScores = fixturesWithPredictions.map((fixture) => ({
      score: calculateScore(
        fixture.goalsHomeTeam,
        fixture.goalsAwayTeam,
        fixture.predictions.pGoalsHomeTeam,
        fixture.predictions.pGoalsAwayTeam,
      ),
    }));

    const chunkedScores = chunkArrayTotoRoundsHelper(fixturesWithScores);

    const scores = chunkedScores.map((totoround) =>
      totoround.map((round) => round.reduce((a, b) => a + b.score, 0)),
    );
    return scores;
  }
  return [];
};
