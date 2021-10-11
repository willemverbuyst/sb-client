const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const User = require('../../models').user;
const { reducer } = require('../../utils/helper.functions');
const { scoreFunctions } = require('../../utils');

const { calculateScore } = scoreFunctions;

module.exports = async (roundNumber) => {
  const season = `Regular Season - ${roundNumber}`;

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
          round: season,
        },
      },
      { model: User, attributes: ['userName', 'id'] },
    ],
    raw: true,
    nest: true,
  });

  if (predictions.length > 0) {
    const predictionsWithScores = predictions.map((pred) => ({
      score: calculateScore(
        pred.fixture.goalsHomeTeam,
        pred.fixture.goalsAwayTeam,
        pred.pGoalsHomeTeam,
        pred.pGoalsAwayTeam,
      ),
      name: pred.user.userName,
      id: pred.user.id,
    }));

    const predictionsReduced = reducer(predictionsWithScores);
    return predictionsReduced;
  }
  return predictions;
};
