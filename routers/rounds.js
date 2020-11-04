const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Fixture = require('../models').fixture;

const router = new Router();

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
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
});

module.exports = router;
