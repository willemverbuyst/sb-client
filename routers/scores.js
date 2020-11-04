const { Router } = require('express');
//const authMiddleware = require('../auth/authMiddleware');
const Prediction = require('../models').prediction;
const Fixture = require('../models').fixture;
const { Op } = require('sequelize');
const calculateScore = require('../utils/calc-scores');

const router = new Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const toUpdateScore = await Prediction.findAll({
      attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam', 'id'],
      include: [
        {
          model: Fixture,
          attributes: ['goalsHomeTeam', 'goalsAwayTeam', 'status'],
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
      ],
      where: { userId: id },
    });

    if (toUpdateScore.length) {
      calculatedScores = toUpdateScore.map((row) => {
        return {
          id: row.id,
          totalScore: calculateScore(
            {
              homeTeam: row.fixture.goalsHomeTeam,
              awayTeam: row.fixture.goalsAwayTeam,
            },
            {
              homeTeam: row.pGoalsHomeTeam,
              awayTeam: row.pGoalsAwayTeam,
            }
          ),
        };
      });
      return res.status(200).send(calculatedScores);
    } else {
      return res.status(200).send({ message: 'No total scores' });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
