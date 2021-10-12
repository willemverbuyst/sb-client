const { Op } = require('sequelize');
const Fixture = require('../../models').fixture;
const Prediction = require('../../models').prediction;
const User = require('../../models').user;
const { helperFunctions, scoreFunctions } = require('../../utils');

const { reducerHelper } = helperFunctions;
const { calculateScore } = scoreFunctions;

module.exports = async (totoRoundNumber) => {
  const rounds = [
    totoRoundNumber * 3 - 2,
    totoRoundNumber * 3 - 1,
    totoRoundNumber * 3,
  ];
  if (Number(totoRoundNumber) === 11) rounds.push(totoRoundNumber * 3 + 1);

  const seasons = rounds.map((a) => `Regular Season - ${a}`);

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
          round: { [Op.in]: seasons },
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

    const predictionsReduced = reducerHelper(predictionsWithScores);

    return predictionsReduced;
  }
  return predictions;
};
