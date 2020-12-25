const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const { Op } = require('sequelize');
const calcScores = require('../utils/calc-scores');
const reducer = require('../utils/reducer');
const {
  chunkArrayTotoRounds,
  lastMonday,
} = require('../utils/helper-functions');

const router = new Router();

/*** GET THE SCORE OF EACH USER FOR A SPECIFIC PAST FIXTURE ***/
/*** PUBLIC ***/
router.get('/fixtures/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const fixture = await Fixture.findOne({
      where: { id },
    });

    if (fixture.status === 'Match Finished') {
      try {
        const predictions = await Prediction.findAll({
          where: { fixtureId: +id },
          include: [{ model: User, attributes: ['userName', 'id'] }],
          raw: true,
          nest: true,
        });

        if (predictions.length > 0) {
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
                }
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

          return res.status(200).send({ fixture, scores });
        } else {
          return res.status(200).send({ fixture, scores: null });
        }
      } catch (error) {
        return res.status(400).send({ message: 'Something went wrong, sorry' });
      }
    } else {
      return res.status(200).send({ fixture, scores: null });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR ALL PAST FIXTURES (TOTAL TOTO) ***/
/*** PUBLIC ***/
router.get('/all', authMiddleware, async (_req, res) => {
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
        { model: User, attributes: ['userName', 'id', 'totaalToto'] },
      ],
      raw: true,
      nest: true,
    });

    if (predictions.length > 0) {
      const predictionsWithScores = [...predictions]
        .filter((pred) => pred.user.totaalToto)
        .map((pred) => {
          return {
            ...pred,
            score: calcScores(
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

      let predictionsReduced = reducer(predictionsWithScores);

      return res.status(200).send(predictionsReduced);
    } else {
      return res.status(200).send({ predictions });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR A SPECIFIC PAST TOTOROUND ***/
/*** PUBLIC ***/
router.get('/totorounds/:id', authMiddleware, async (req, res) => {
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

    if (predictions.length > 0) {
      const predictionsWithScores = predictions.map((pred) => {
        return {
          ...pred,
          score: calcScores(
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

      const predictionsReduced = reducer(predictionsWithScores);

      const totoRound = {
        usersWithScores: predictionsReduced,
        id,
      };

      return res.status(200).send(totoRound);
    } else {
      const totoRound = {
        usersWithScores: predictions,
        id,
      };
      return res.status(200).send(totoRound);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR A SPECIFIC PAST ROUND ***/
/*** PUBLIC ***/
router.get('/rounds/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const season = `Regular Season - ${id}`;

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
            round: season,
          },
        },
        { model: User, attributes: ['userName', 'id'] },
      ],
      raw: true,
      nest: true,
    });

    if (predictions.length > 0) {
      const predictionsWithScores = predictions.map((pred) => {
        return {
          ...pred,
          score: calcScores(
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

      const predictionsReduced = reducer(predictionsWithScores);
      const round = {
        usersWithScores: predictionsReduced,
        id,
      };

      return res.status(200).send(round);
    } else {
      const round = {
        usersWithScores: predictions,
        id,
      };

      return res.status(200).send(round);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE SCORES OF A ALL PAST ROUNDS FOR A PLAYER ***/
/*** PUBLIC ***/
router.get('/players/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const timeStampLastMonday = lastMonday();

  const fixtures = await Fixture.findAll({
    where: {
      eventTimeStamp: {
        [Op.lt]: [timeStampLastMonday],
      },
    },
    order: [['id', 'ASC']],
  });

  try {
    const fixturesWithPredictions = await Fixture.findAll({
      where: {
        id: {
          [Op.lte]: fixtures[fixtures.length - 1].id,
        },
      },
      include: [
        {
          model: Prediction,
          where: {
            userId: +id,
          },
          required: false,
        },
      ],
      order: [['id', 'ASC']],
      raw: true,
      nest: true,
    });

    if (fixtures.length > 0) {
      const fixturesWithScores = fixturesWithPredictions.map((fixture) => {
        return {
          score: calcScores(
            {
              homeTeam: fixture.goalsHomeTeam,
              awayTeam: fixture.goalsAwayTeam,
            },
            {
              homeTeam: fixture.predictions.pGoalsHomeTeam,
              awayTeam: fixture.predictions.pGoalsAwayTeam,
            }
          ),
        };
      });

      const chunkedScores = chunkArrayTotoRounds(fixturesWithScores);

      const scores = chunkedScores.map((totoround) =>
        totoround.map((round) => round.reduce((a, b) => a + b.score, 0))
      );

      const user = await User.findOne({ where: { id } });

      const scoresPlayer = {
        scores,
        userName: user.userName,
        id: user.id,
      };

      return res.status(200).send(scoresPlayer);
    } else {
      const round = {
        usersWithScores: fixtures,
        id,
      };

      return res.status(200).send(round);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
