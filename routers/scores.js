const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const { Op } = require('sequelize');
const calcScores = require('../utils/calc-scores');
const reducer = require('../utils/reducer');

const router = new Router();

/*** GET THE SCORE OF EACH USER FOR A SPECIFIC PAST FIXTURE ***/
/*** PUBLIC ***/
router.get('/fixtures/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const fixture = await Fixture.findOne({
      where: { id },
    });
    const predictions = await Prediction.findAll({
      where: { fixtureId: +id },
      include: [{ model: User, attributes: ['userName'] }],
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
        };
      });

      return res.status(200).send({ fixture, scores });
    } else {
      return res.status(200).send({ fixture, scores: null });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR ALL PAST FIXTURES ***/
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

      let predictionsReduced = reducer(predictionsWithScores);

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
router.get('/games/:id', authMiddleware, async (req, res) => {
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

      const predictionsReduced = reducer(predictionsWithScores);

      return res.status(200).send({ game: predictionsReduced });
    } else {
      return res.status(200).send({ message: 'No total scores' });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET THE TOTAL SCORE OF EACH USER FOR A ALL GAMES ***/
/*** PUBLIC ***/
// router.get('/games', authMiddleware, async (req, res) => {

//   const rounds = [+id * 3 - 2, +id * 3 - 1, +id * 3];
//   if (+id === 11) rounds.push(id * 3 + 1);

//   const seasons = rounds.map((a) => `Regular Season - ${a}`);

//   try {
//     const predictions = await Prediction.findAll({
//       attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam'],
//       include: [
//         {
//           model: Fixture,
//           where: {
//             status: 'Match Finished',
//             goalsHomeTeam: {
//               [Op.ne]: null,
//             },
//             goalsAwayTeam: {
//               [Op.ne]: null,
//             },
//             round: { [Op.in]: seasons },
//           },
//         },
//         { model: User, attributes: ['userName', 'id'] },
//       ],
//       raw: true,
//       nest: true,
//     });

//     if (predictions.length) {
//       const predictionsWithScores = predictions.map((pred) => {
//         return {
//           ...pred,
//           score: calcScores(
//             pred.status,
//             {
//               homeTeam: pred.fixture.goalsHomeTeam,
//               awayTeam: pred.fixture.goalsAwayTeam,
//             },
//             {
//               homeTeam: pred.pGoalsHomeTeam,
//               awayTeam: pred.pGoalsAwayTeam,
//             }
//           ),
//           user: pred.user.userName,
//           id: pred.user.id,
//         };
//       });

//       const predictionsReduced = reducer(predictionsWithScores);

//       return res.status(200).send({ game: predictionsReduced });
//     } else {
//       return res.status(200).send({ message: 'No total scores' });
//     }
//   } catch (error) {
//     return res.status(400).send({ message: 'Something went wrong, sorry' });
//   }
// });

module.exports = router;
