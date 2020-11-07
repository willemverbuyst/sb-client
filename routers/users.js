const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const { lastMonday, chunkArrayRounds } = require('../utils/helper-functions');
const { fixturesPerRound } = require('../constants/set-up-game');
const calcScores = require('../utils/calc-scores');
const { Op } = require('sequelize');

const router = new Router();

/*** GET ALL USERS FOR ADMIN ***/
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user.admin)
      res
        .status(401)
        .send({ message: 'You must be an adminstrator for this request' });
    else
      try {
        const users = await User.findAll({
          attributes: [
            'userName',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
          ],
        });
        return res.status(200).send(users);
      } catch (error) {
        return res.status(400).send({ message: 'Something went wrong, sorry' });
      }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET A USER INCLUDING PREDICTIONS AND SCORES FOR PAST FIXTURES ***/
/*** PUBLIC PROFILE ***/
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const timeStampLastMonday = lastMonday();
    const fixtures = await Fixture.findAll({
      where: {
        eventTimeStamp: {
          [Op.lt]: [timeStampLastMonday],
        },
      },
      order: [['id', 'ASC']],
    });

    const fixturesWithPrediction = await Fixture.findAll({
      where: {
        id: {
          [Op.lte]: fixtures[fixtures.length - 1].id,
        },
      },
      include: {
        model: Prediction,
        where: { userId: id },
        attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
        required: false,
      },
      raw: true,
      nest: true,
    });

    const fixturesWithScores = fixturesWithPrediction.map((fix) => {
      return {
        ...fix,
        score: calcScores(
          fix.status,
          { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
          {
            homeTeam: fix.predictions.pGoalsHomeTeam,
            awayTeam: fix.predictions.pGoalsAwayTeam,
          }
        ),
      };
    });

    const fixturesGroupedByRounds = chunkArrayRounds(
      fixturesWithScores,
      fixturesPerRound
    );

    res.status(200).send(fixturesGroupedByRounds);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
