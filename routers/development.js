const { Router } = require('express');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;

const router = new Router();

router.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/users/:id/predictions', async (req, res) => {
  const { id } = req.params;
  try {
    const predictions = await Prediction.findAll({
      where: { userId: id },
      include: [{ model: Fixture }, { model: User, attributes: ['userName'] }],
    });
    return res.status(200).send(predictions);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
