const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const User = require('../../models').user;
const { scoreFunctions } = require('../../utils');
const { reducer } = require('../../utils/helper.functions');

const { calculateScore } = scoreFunctions;

module.exports = async () => {
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
      .filter((prediction) => prediction.user.totaalToto)
      .map((prediction) => ({
        score: calculateScore(
          prediction.fixture.goalsHomeTeam,
          prediction.fixture.goalsAwayTeam,
          prediction.pGoalsHomeTeam,
          prediction.pGoalsAwayTeam,
        ),
        name: prediction.user.userName,
        id: prediction.user.id,
      }));

    const scoresTotalToto = reducer(predictionsWithScores);

    return scoresTotalToto;
  }
  return [];
};
