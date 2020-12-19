const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const Team = require('../models').team;
const User = require('../models').user;
const {
  lastMonday,
  chunkArrayTotoRounds,
} = require('../utils/helper-functions');
const calcScores = require('../utils/calc-scores');
const { Op } = require('sequelize');

const router = new Router();

/*** GET ALL USERS ***/
router.get('/', authMiddleware, async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'admin',
        'totaalToto',
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'logo', 'name'],
        },
      ],
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET A USER INCLUDING PREDICTIONS AND SCORES FOR PAST FIXTURES ***/
/*** PUBLIC PROFILE ***/
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id: +id },
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'admin',
        'totaalToto',
      ],
      include: [
        {
          model: Team,
          attributes: ['id', 'logo', 'name'],
        },
      ],
      raw: true,
      nest: true,
    });

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
      order: [['id', 'ASC']],
      raw: true,
      nest: true,
    });

    const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
      return {
        ...fix,
        score: calcScores(
          { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
          {
            homeTeam: fix.predictions.pGoalsHomeTeam,
            awayTeam: fix.predictions.pGoalsAwayTeam,
          }
        ),
      };
    });

    const fixturesGroupedByTotoRounds = chunkArrayTotoRounds(
      fixturesWithPredictionAndScore
    );

    // FILTER OUT PREDICTIONS AND SCORE WHEN NOT STATUS MATCH FINISHED

    user.pastFixturesWithScores = fixturesGroupedByTotoRounds;

    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** UPDATE USER ADMIN STATUS BY ADMIN ***/
router.patch('/:id/admin', authMiddleware, async (req, res) => {
  const { admin } = req.body;
  const { id } = req.params;

  if (!typeof admin === 'boolean')
    return res.status(400).send('Admin status is missing, please try again');

  try {
    if (!req.user.admin)
      res
        .status(401)
        .send({ message: 'You must be an adminstrator for this request' });
    else {
      try {
        const userToUpdate = await User.findOne({ where: { id: +id } });

        await userToUpdate.update({
          admin,
        });

        const updatedUser = await User.findOne({
          where: { id: +id },
        });

        delete updatedUser.dataValues['password'];

        return res.status(200).send({
          updatedUser: updatedUser,
          message: 'The user profile has been updated',
        });
      } catch (error) {
        return res.status(400).send({ message: 'Something went wrong, sorry' });
      }
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
