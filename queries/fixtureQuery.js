const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const calcScores = require('../utils/calc-scores');
const { Op } = require('sequelize');
const {
  chunkArrayTotoRounds,
  getTotoRoundNumber,
  lastMonday,
  nextMonday,
} = require('../utils/helper-functions');

const timeStampLastMonday = lastMonday();
const timeStampNextMonday = nextMonday();

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

const getFixture = async (id) => await Fixture.findOne({ where: { id } });

module.exports = {
  getAllFixturesForLoggedInUser,
  getCurrentRoundForUser,
  getFixture,
};
