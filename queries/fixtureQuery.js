const { Op } = require('sequelize');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { lastMonday, nextMonday } = require('../utils/date.functions');
const {
  chunkArrayTotoRounds,
  getTotoRoundNumber,
} = require('../utils/helper.functions');
const { calculateScore } = require('../utils/scores.functions');

const getAllFixturesWithPrediction = async (playerId, userId) => {
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

const getCurrentRoundForUser = async (id) => {
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

const getFixture = async (id) => await Fixture.findOne({ where: { id } });

const getLastUpdate = async (id) => {
  const fixture = await Fixture.findOne({
    where: { id },
    attributes: ['updatedAt'],
  });

  const lastUpdate = fixture ? new Date(fixture.dataValues.updatedAt) : null;

  return lastUpdate;
};

module.exports = {
  getAllFixturesWithPrediction,
  getCurrentRoundForUser,
  getFixture,
  getLastUpdate,
};
