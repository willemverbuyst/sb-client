const { Router } = require('express');
const User = require('../models').user;

const router = new Router();

router.get('/users', async (_req, res, _next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
