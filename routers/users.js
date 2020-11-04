const { Router } = require('express');
const authMiddleware = require('../auth/authMiddleware');
const User = require('../models').user;

const router = new Router();

router.get('/', authMiddleware, async (req, res) => {
  if (!req.user.admin)
    res
      .status(401)
      .send({ message: 'You must be an adminstrator for this request' });

  try {
    const users = await User.findAll({
      attributes: ['userName', 'firstName', 'lastName', 'email', 'phoneNumber'],
    });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
