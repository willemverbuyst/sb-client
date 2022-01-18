const Prediction = require('../../models').prediction;
const updatePredictionQuery = require('./updatePrediction.query');

module.exports = async (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId, userId) => {
  // To prevent multiple predictions, check if it exists already
  const predictionExists = await Prediction.findOne({
    where: { fixtureId, userId },
  });

  // If so use updatePrediction instead
  if (predictionExists) {
    const prediction = await updatePredictionQuery(
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
