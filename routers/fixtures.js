const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;
const Team = require('../models').team;

const router = new Router();

router.get('/', async (_req, res) => {
  try {
    const fixtures = await Fixture.findOne({
      where: { id: 573165 },
    });

    return res.status(200).send(fixtures);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
