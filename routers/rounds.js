const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const lastMonday = require('../utils/helper-functions');
const { Op } = require('sequelize');

const router = new Router();

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (id === 'current') {
    try {
      const timeStampNow = lastMonday();
      const fixtures = await Fixture.findAll({
        where: {
          eventTimeStamp: {
            [Op.between]: [timeStampNow, timeStampNow + 7 * 24 * 60 * 60],
          },
        },
      });
      res.status(200).send(fixtures);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  } else {
    try {
      const fixtures = await Fixture.findAll({
        where: {
          round: `Regular Season - ${id}`,
        },
      });
      return res.status(200).send(fixtures);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
});

module.exports = router;
