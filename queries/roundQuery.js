const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { Op } = require('sequelize');
const {
  lastMonday,
  nextMonday,
  getTotoRoundNumber,
} = require('../utils/helper-functions');

const timeStampLastMonday = lastMonday();
const timeStampNextMonday = nextMonday();

const getCurrentRoundForUser = async (id) => {
  const fixturesWithPrediction = await Fixture.findAll({
    where: {
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
    raw: true,
    nest: true,
  });

  const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
    return {
      ...fix,
      score: calcScores(
        fix.status,
        { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
        {
          homeTeam: fix.predictions.pGoalsHomeTeam,
          awayTeam: fix.predictions.pGoalsAwayTeam,
        },
      ),
    };
  });

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

module.exports = { getCurrentRoundForUser };
