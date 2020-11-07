const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Prediction = require('../models').prediction;
const Fixture = require('../models').fixture;
const User = require('../models').user;
const { Op } = require('sequelize');
const { fixturesPerRound, roundsPerGame } = require('../constants/set-up-game');
const calcScores = require('../utils/calc-scores');
const { chunkArrayGames, lastMonday } = require('../utils/helper-functions');

const router = new Router();

/*** GET THE SCORE OF EACH USER FOR A SPECIFIC PAST FIXTURE ***/
/*** PUBLIC ***/
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

/*** GET THE TOTAL SCORE OF EACH USER FOR ALL PAST FIXTURES ***/
/*** PUBLIC ***/
router.get('/all', async (req, res) => {
  try {
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
        { model: User, attributes: ['userName', 'id'] },
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
          user: pred.user.userName,
          id: pred.user.id,
        };
      });

      let predictionsReduced = [];
      predictionsWithScores.reduce((a, b) => {
        if (!a[b.id]) {
          a[b.id] = { id: b.id, user: b.user, score: 0 };
          predictionsReduced.push(a[b.id]);
        }
        a[b.id].score += b.score;
        return a;
      }, {});

      return res.status(200).send(predictionsReduced);
    } else {
      return res.status(200).send({ message: 'No total scores' });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR A SPECIFIC PAST GAME ***/
/*** PUBLIC ***/
router.get('/games/:id', async (req, res) => {
  const { id } = req.params;

  const rounds = [+id * 3 - 2, +id * 3 - 1, +id * 3];
  if (+id === 11) rounds.push(id * 3 + 1);

  const seasons = rounds.map((a) => `Regular Season - ${a}`);

  try {
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
          user: pred.user.userName,
          id: pred.user.id,
        };
      });

      let predictionsReduced = [];
      predictionsWithScores.reduce((a, b) => {
        if (!a[b.id]) {
          a[b.id] = { id: b.id, user: b.user, score: 0 };
          predictionsReduced.push(a[b.id]);
        }
        a[b.id].score += b.score;
        return a;
      }, {});

      return res.status(200).send(predictionsReduced);
    } else {
      return res.status(200).send({ message: 'No total scores' });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
