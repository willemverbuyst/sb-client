const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { Op } = require('sequelize');
const {
  lastMonday,
  nextMonday,
  chunkArrayGames,
  totoRoundNumber,
} = require('../utils/helper-functions');
const {
  fixturesPerRound,
  roundsPerTotoRound,
} = require('../constants/set-up-game');
const calcScores = require('../utils/calc-scores');

const router = new Router();

/*** GET CURRENT FIXTURES (9), i.e. 1 ROUND FOR LOGGED IN USER ***/
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

    const currentSeason = fixturesWithScores[0].round;
    const currentTotoRound = totoRoundNumber(currentSeason.slice(-2));

    const currentRound = {
      round: currentSeason,
      totoRound: currentTotoRound,
      fixturesWithScores,
    };

    res.status(200).send(currentRound);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET ALL FIXTURES (306), i.e. 34 ROUNDS FOR LOGGED IN USER ***/
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

    const fixturesGroupedByRounds = chunkArrayGames(
      fixturesWithScores,
      fixturesPerRound,
      roundsPerTotoRound
    );

    res.status(200).send(fixturesGroupedByRounds);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
