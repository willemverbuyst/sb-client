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

//####REFACTORED
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
    return res.status(400).send({ message: 'Er gaat iets mis, sorry.' });
  }
});

//####REFACTORED
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

    // const fixtures = await Fixture.findAll({
    //   where: {
    //     eventTimeStamp: {
    //       [Op.lt]: [timeStampLastMonday],
    //     },
    //   },
    //   order: [['id', 'ASC']],
    // });

    // const fixturesWithPrediction = await Fixture.findAll({
    //   where: {
    //     id: {
    //       [Op.lte]: fixtures[fixtures.length - 1].id,
    //     },
    //   },
    //   include: {
    //     model: Prediction,
    //     where: { userId: id },
    //     attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
    //     required: false,
    //   },
    //   order: [['id', 'ASC']],
    //   raw: true,
    //   nest: true,
    // });

    const fixturesWithPrediction = await Fixture.findAll({
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
          },
        ),
      };
    });

    const fixturesGroupedByTotoRounds = chunkArrayTotoRounds(
      fixturesWithPredictionAndScore,
    );

    // Public: set predictions to null when match is not played yet
    const fixturesWithHiddenPredictions = fixturesGroupedByTotoRounds.map(
      (totoround) =>
        totoround.map((round) =>
          round.map((fixture) => {
            if (fixture.status !== 'Match Finished') {
              return {
                ...fixture,
                predictions: {
                  pGoalsAwayTeam: null,
                  pGoalsHomeTeam: null,
                },
              };
            } else {
              return fixture;
            }
          }),
        ),
    );
    user.pastFixturesWithScores = fixturesWithHiddenPredictions;

    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ message: 'Er gaat iets mis, sorry.' });
  }
});

//####REFACTORED --- OBSOLETE
/*** UPDATE USER ADMIN STATUS BY ADMIN ***/
router.patch('/:id/admin', authMiddleware, async (req, res) => {
  const { admin } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  if (!typeof admin === 'boolean')
    return res
      .status(400)
      .send({ message: 'De admin status ontbreekt, probeer opnieuw.' });

  if (+userId === +id)
    return res
      .status(400)
      .send({ message: 'Je kan je eigen admin status niet wijzigen!' });

  try {
    if (!req.user.admin)
      res
        .status(401)
        .send({ message: 'Je moet een admin zijn voor dit verzoek!' });
    else {
      try {
        const userToUpdate = await User.findOne({ where: { id: +id } });

        await userToUpdate.update({
          admin,
        });

        const updatedUser = await User.findOne({
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
        });

        return res.status(200).send({
          updatedUser,
          message: 'De admin status van de speler is gewijzigd.',
        });
      } catch (error) {
        return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
      }
    }
  } catch (error) {
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

//####REFACTORED
/*** DELETE USER AND HER/HIS PREDICTIONS BY ADMIN ***/
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    await Prediction.destroy({ where: { userId: id } });

    return res.status(200).send({ message: 'Speler is verwijderd!' });
  } catch (error) {
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

module.exports = router;
