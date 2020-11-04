const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;

const router = new Router();

router.get('/', async (_req, res) => {
  try {
    const fixtures = await Fixture.findAll();

    return res.status(200).send(fixtures);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const fixture = await Fixture.findOne({ where: { id } });

    return res.status(200).send(fixture);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
