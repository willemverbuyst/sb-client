const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const lastMonday = require('../utils/helper-functions');
const { Op } = require('sequelize');

const router = new Router();

router.get('/current/users/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  // check if the user is the same one as the one who is logged in
  if (req.user.id !== +id)
    res.status(401).send({ message: 'You are not allowed to see this data' });

  try {
    const timeStampNow = lastMonday();
    const fixtures = await Fixture.findAll({
      where: {
        eventTimeStamp: {
          [Op.between]: [timeStampNow, timeStampNow + 7 * 24 * 60 * 60],
        },
      },
      include: { model: Prediction, where: { userId: id }, required: false },
    });
    res.status(200).send(fixtures);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
