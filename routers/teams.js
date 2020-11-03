const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Team = require('../models').team;

const router = new Router();

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).send(teams);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
