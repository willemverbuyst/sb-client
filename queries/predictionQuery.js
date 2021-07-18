const Prediction = require('../models').prediction;
const User = require('../models').user;
const calculateScores = require('../utils/calc-scores');

const createPrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  userId,
  fixtureId,
) => {
  const createdPrediction = await Prediction.create({
    pGoalsHomeTeam: +pGoalsHomeTeam,
    pGoalsAwayTeam: +pGoalsAwayTeam,
    userId,
    fixtureId: +fixtureId,
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
      score: calculateScores(
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

module.exports = {
  createPrediction,
  getAllPredictionsForFixture,
  updatePrediction,
};
