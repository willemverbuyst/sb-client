const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Prediction = require('../models').prediction;
const Fixture = require('../models').fixture;
const User = require('../models').user;
const { Op } = require('sequelize');
const { fixturesPerRound, game } = require('../constants/set-up-game');
const calcScores = require('../utils/calc-scores');
const {
  chunkArrayRounds,
  chunkArrayGames,
} = require('../utils/helper-functions');

const router = new Router();

/*** GET THE SCORE OF EACH USER FOR A PAST FIXTURES ***/
/*** PUBLIC ***/
router.get('/fixtures/:id', authMiddleware, async (req, res) => {
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

/*** GET THE SCORE OF EACH USER FOR A PAST FIXTURES ***/
/*** PUBLIC ***/
router.get('/all', async (req, res) => {
  try {
    const fixtures = await Fixture.findAll({ attributes: ['id'] });

    const fixturesGroupedByGames = chunkArrayGames(
      fixtures,
      fixturesPerRound,
      game
    );

    return res.status(200).send(fixturesGroupedByGames);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
