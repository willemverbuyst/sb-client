const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const calculateScore = require('../utils/calc-scores');
const { Op } = require('sequelize');
const reducer = require('../utils/reducer');

const createPrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
  userId,
) => {
  // To prevent multiple predictions, check if it exists already
  const predictionExists = await Prediction.findOne({
    where: { fixtureId, userId },
  });

  // If so use updatePrediction instead
  if (predictionExists) {
    const prediction = await updatePrediction(
      pGoalsHomeTeam,
      pGoalsAwayTeam,
      fixtureId,
      userId,
    );
    return prediction;
  }

  // If it does not exist, create a new prediction
  const createdPrediction = await Prediction.create({
    pGoalsHomeTeam: pGoalsHomeTeam,
    pGoalsAwayTeam: pGoalsAwayTeam,
    userId,
    fixtureId: fixtureId,
  });

  const prediction = {
    pGoalsAwayTeam: createdPrediction.pGoalsAwayTeam,
    pGoalsHomeTeam: createdPrediction.pGoalsHomeTeam,
    fixtureId: createdPrediction.fixtureId,
  };

  return prediction;
};

const getAllPredictionsForFixture = async (fixture) => {
  const predictions = await Prediction.findAll({
    where: { fixtureId: fixture.id },
    include: [{ model: User, attributes: ['userName', 'id'] }],
    raw: true,
    nest: true,
  });

  if (fixture.status !== 'Match Finished' || !(predictions.length > 0)) {
    return null;
  }

  const predictionsWithScores = predictions.map((prediction) => {
    return {
      ...prediction,
      score: calculateScore(
        {
          homeTeam: fixture.goalsHomeTeam,
          awayTeam: fixture.goalsAwayTeam,
        },
        {
          homeTeam: prediction.pGoalsHomeTeam,
          awayTeam: prediction.pGoalsAwayTeam,
        },
      ),
    };
  });

  const scores = predictionsWithScores.map((predictionsWithScore) => {
    return {
      pGoalsHomeTeam: predictionsWithScore.pGoalsHomeTeam,
      pGoalsAwayTeam: predictionsWithScore.pGoalsAwayTeam,
      score: predictionsWithScore.score,
      user: predictionsWithScore.user.userName,
      userId: predictionsWithScore.user.id,
    };
  });

  return scores;
};

const updatePrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
  userId,
) => {
  const updatedPrediction = await Prediction.update(
    {
      pGoalsHomeTeam: pGoalsHomeTeam,
      pGoalsAwayTeam: pGoalsAwayTeam,
    },
    { where: { fixtureId, userId }, returning: true, plain: true },
  );

  const prediction = {
    pGoalsAwayTeam: updatedPrediction[1].dataValues.pGoalsAwayTeam,
    pGoalsHomeTeam: updatedPrediction[1].dataValues.pGoalsHomeTeam,
    fixtureId: updatedPrediction[1].dataValues.fixtureId,
  };

  return prediction;
};

const getScoresTotalToto = async () => {
  const predictions = await Prediction.findAll({
    attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam'],
    include: [
      {
        model: Fixture,
        where: {
          status: 'Match Finished',
          goalsHomeTeam: {
            [Op.ne]: null,
          },
          goalsAwayTeam: {
            [Op.ne]: null,
          },
        },
      },
      { model: User, attributes: ['userName', 'id', 'totaalToto'] },
    ],
    raw: true,
    nest: true,
  });

  if (predictions.length > 0) {
    const predictionsWithScores = [...predictions]
      .filter((pred) => pred.user.totaalToto)
      .map((pred) => {
        return {
          ...pred,
          score: calculateScore(
            {
              homeTeam: pred.fixture.goalsHomeTeam,
              awayTeam: pred.fixture.goalsAwayTeam,
            },
            {
              homeTeam: pred.pGoalsHomeTeam,
              awayTeam: pred.pGoalsAwayTeam,
            },
          ),
          user: pred.user.userName,
          userId: pred.user.id,
        };
      });

    let scoresTotalToto = reducer(predictionsWithScores);

    return scoresTotalToto;
  } else {
    return [];
  }
};

module.exports = {
  createPrediction,
  getAllPredictionsForFixture,
  getScoresTotalToto,
  updatePrediction,
};
