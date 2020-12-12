const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { Op } = require('sequelize');
const {
  lastMonday,
  nextMonday,
  chunkArrayTotoRounds,
  getTotoRoundNumber,
} = require('../utils/helper-functions');
const calcScores = require('../utils/calc-scores');

const router = new Router();

/*** GET CURRENT ROUND (9 FIXTURES) FOR LOGGED IN USER ***/
/*** INCLUDING PREDICTIONS AND SCORES ***/
router.get('/current', authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const timeStampLastMonday = lastMonday();
    const timeStampNextMonday = nextMonday();

    const fixturesWithPrediction = await Fixture.findAll({
      where: {
        eventTimeStamp: {
          [Op.between]: [timeStampLastMonday, timeStampNextMonday],
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

    const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
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

    const roundNumber = fixturesWithPredictionAndScore[0].round.slice(-2);
    const totoRoundNumber = getTotoRoundNumber(roundNumber);

    const currentRound = {
      roundNumber,
      totoRoundNumber,
      fixtures: fixturesWithPredictionAndScore,
    };

    res.status(200).send(currentRound);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET ALL 34 ROUNDS (306 FIXTURES) FOR LOGGED IN USER ***/
/*** INCLUDING PREDICTIONS AND SCORES ***/
router.get('/all', authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
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
          fix.status,
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

    res.status(200).send(fixturesGroupedByTotoRounds);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
