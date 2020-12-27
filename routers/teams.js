const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const Team = require('../models').team;

const router = new Router();

/*** GET ALL TEAMS ***/
router.get('/', authMiddleware, async (_req, res) => {
  try {
    const teams = await Team.findAll();
    return res.status(200).send(teams);
  } catch (error) {
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

module.exports = router;
