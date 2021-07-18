const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { Op } = require('sequelize');
const {
  chunkArrayTotoRounds,
  getTotoRoundNumber,
  lastMonday,
  nextMonday,
} = require('../utils/helper-functions');
const {
  addScoresTofixturesWithPrediction,
} = require('../utils/scores.functions');

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

  const fixturesWithPredictionAndScore = addScoresTofixturesWithPrediction(
    fixturesWithPrediction,
  );
  const fixturesGroupedByTotoRounds = chunkArrayTotoRounds(
    fixturesWithPredictionAndScore,
  );

  return fixturesGroupedByTotoRounds;
};

const getCurrentRoundForUser = async (id) => {
  const timeStampLastMonday = lastMonday();
  const timeStampNextMonday = nextMonday();
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

  const fixturesWithPredictionAndScore = addScoresTofixturesWithPrediction(
    fixturesWithPrediction,
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

const getPastFixturesWithPredictionsAndScores = async (id) => {
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

  const fixturesWithPredictionAndScore = addScoresTofixturesWithPrediction(
    fixturesWithPrediction,
  );

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

module.exports = {
  getAllFixturesForLoggedInUser,
  getCurrentRoundForUser,
  getFixture,
  getPastFixturesWithPredictionsAndScores,
};
