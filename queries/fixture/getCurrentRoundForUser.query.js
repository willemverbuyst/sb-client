const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const { lastMonday, nextMonday } = require('../../utils/date.functions');
const { getTotoRoundNumber } = require('../../utils/helper.functions');
const { scoreFunctions } = require('../../utils');

const { calculateScore } = scoreFunctions;

module.exports = async (id) => {
  const timeStampLastMonday = lastMonday();
  const timeStampNextMonday = nextMonday();
  const fixturesWithPrediction = await Fixture.findAll({
    where: {
      round: { [Op.regexp]: '^Regular' },
      eventTimeStamp: {
        [Op.between]: [timeStampLastMonday, timeStampNextMonday],
      },
      status: 'Not Started',
    },
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

  let currentRound = null;

  if (fixturesWithPredictionAndScore.length > 0) {
    const roundNumber = fixturesWithPredictionAndScore[0].round.slice(-2);
    const totoRoundNumber = getTotoRoundNumber(roundNumber);

    currentRound = {
      roundNumber,
      totoRoundNumber,
      fixtures: fixturesWithPredictionAndScore,
    };
  }
  return currentRound;
};
