const Prediction = require('../models').prediction;
const User = require('../models').user;
const calcScores = require('../utils/calc-scores');

const createPrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  userId,
  fixtureId,
) => {
  await Prediction.create({
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

  const predictionsWithScores = predictions.map((pred) => {
    return {
      ...pred,
      score: calcScores(
        {
          homeTeam: fixture.goalsHomeTeam,
          awayTeam: fixture.goalsAwayTeam,
        },
        {
          homeTeam: pred.pGoalsHomeTeam,
          awayTeam: pred.pGoalsAwayTeam,
        },
      ),
    };
  });

  const scores = predictionsWithScores.map((a) => {
    return {
      pGoalsHomeTeam: a.pGoalsHomeTeam,
      pGoalsAwayTeam: a.pGoalsAwayTeam,
      score: a.score,
      user: a.user.userName,
      userId: a.user.id,
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
