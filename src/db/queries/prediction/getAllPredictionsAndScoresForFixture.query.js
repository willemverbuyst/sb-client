const Prediction = require('../../models').prediction;
const User = require('../../models').user;
const { scoreFunctions } = require('../../../utils');

const { calculateScore } = scoreFunctions;

module.exports = async (fixture) => {
  const predictions = await Prediction.findAll({
    where: { fixtureId: fixture.id },
    include: [{ model: User, attributes: ['userName', 'id'] }],
    raw: true,
    nest: true,
  });

  if (fixture.status !== 'Match Finished' || !(predictions.length > 0)) {
    return null;
  }

  const predictionsWithScores = predictions.map((prediction) => ({
    name: prediction.user.userName,
    id: prediction.user.id,
    pGoalsHomeTeam: prediction.pGoalsHomeTeam,
    pGoalsAwayTeam: prediction.pGoalsAwayTeam,
    score: calculateScore(
      fixture.goalsHomeTeam,
      fixture.goalsAwayTeam,
      prediction.pGoalsHomeTeam,
      prediction.pGoalsAwayTeam,
    ),
  }));

  return predictionsWithScores;
};
