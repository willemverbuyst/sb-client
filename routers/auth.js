const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
const { SALT_ROUNDS } = require('../config/constants');
const authMiddleware = require('../auth/authMiddleware');
const User = require('../models').user;
const Team = require('../models').team;

const router = new Router();

/*** LOGIN ***/
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .send({ message: 'Please provide both email and password' });

  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(400).send({
        message: 'User with that email not found or password incorrect',
      });

    delete user.dataValues['password'];

    const token = toJWT({ userId: user.id });

    return res.status(200).send({
      userData: { token, ...user.dataValues },
      message: `Welcome back ${user.userName}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** SIGNUP NEW USER BY ADMIN ***/
router.post('/signup', authMiddleware, async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  } = req.body;

  if (!req.user.admin)
    res
      .status(401)
      .send({ message: 'You must be an adminstrator for this request' });

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !teamId
  ) {
    return res.status(400).send({ message: 'Please provide all the details' });
  }

  try {
    await User.create({
      userName,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      phoneNumber,
      admin,
      totaalToto,
      teamId,
    });

    const newUser = await User.findOne({
      where: { email },
      attributes: [
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'admin',
        'totaalToto',
      ],
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    res.status(201).json({
      userData: newUser,
      message: `A new user profile has been created for ${newUser.dataValues.userName}`,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return res
        .status(400)
        .send({ message: 'There is an existing account with this email' });

    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET INFO USER IF THERE IS A JWT TOKEN ***/
router.get('/me', authMiddleware, async (req, res) => {
  try {
    delete req.user.dataValues['password'];
    res.status(200).send({ ...req.user.dataValues });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** CHANGE PASSWORD ***/
router.patch('/me/password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword)
    return res.status(400).send({ message: 'Please provide new password' });

  if (bcrypt.compareSync(newPassword, req.user.password))
    return res
      .status(400)
      .send({ message: 'You new new password must differ from the old one!' });

  try {
    const user = req.user;
    await user.update({
      password: bcrypt.hashSync(newPassword, SALT_ROUNDS),
    });

    return res.status(200).send({
      message: 'Your has password has been changed',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** UPDATE USER DETAILS ***/
router.patch('/me/profile', authMiddleware, async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    admin,
    totaalToto,
    favteamId,
  } = req.body;

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !favteamId
  )
    return res.status(400).send('Some data is missing, please try again');

  try {
    const userToUpdate = req.user;

    if (!userToUpdate || !bcrypt.compareSync(password, userToUpdate.password))
      return res.status(400).send({
        message: 'User with that email not found or password incorrect',
      });

    await userToUpdate.update({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      admin,
      totaalToto,
      favteamId,
    });

    const user = await User.findOne({
      where: { email },
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    delete user.dataValues['password'];

    const token = toJWT({ userId: user.id });

    return res.status(200).send({
      userData: {
        token,
        ...user.dataValues,
      },
      message: 'Your user profile has been updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
