const { Router } = require('express');
//const authMiddleware = require('../auth/authMiddleware');
const Prediction = require('../models').prediction;
const Fixture = require('../models').fixture;
const User = require('../models').user;
const { Op } = require('sequelize');
const calcScores = require('../utils/calc-scores');

const router = new Router();

router.get('/fixtures/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const predictions = await Prediction.findAll({
      where: { fixtureId: +id },
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
        { model: User, attributes: ['userName'] },
      ],
      raw: true,
      nest: true,
    });

    if (predictions.length) {
      const predictionsWithScores = predictions.map((pred) => {
        return {
          ...pred,
          score: calcScores(
            pred.status,
            {
              homeTeam: pred.fixture.goalsHomeTeam,
              awayTeam: pred.fixture.goalsAwayTeam,
            },
            {
              homeTeam: pred.pGoalsHomeTeam,
              awayTeam: pred.pGoalsAwayTeam,
            }
          ),
        };
      });

      const predictionsReduced = {
        fixture: predictionsWithScores[0].fixture,
        scores: predictionsWithScores.map((a) => {
          return {
            pGoalsHomeTeam: a.pGoalsHomeTeam,
            pGoalsAwayTeam: a.pGoalsAwayTeam,
            score: a.score,
            user: a.user.userName,
          };
        }),
      };

      return res.status(200).send(predictionsReduced);
    } else {
      return res.status(200).send({ message: 'No total scores' });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
