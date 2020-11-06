const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const User = require('../models').user;
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { lastMonday, chunkArray } = require('../utils/helper-functions');
const { Op } = require('sequelize');

const router = new Router();

router.get('/', authMiddleware, async (req, res) => {
  if (!req.user.admin)
    res
      .status(401)
      .send({ message: 'You must be an adminstrator for this request' });

  try {
    const users = await User.findAll({
      attributes: ['userName', 'firstName', 'lastName', 'email', 'phoneNumber'],
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/:id', async (req, res) => {
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
    });

    const fixturesGroupedByRounds = chunkArray(fixturesWithPrediction, 9);

    res.status(200).send(fixturesGroupedByRounds);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
