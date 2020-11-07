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

/*** SIGNUP NEW USER ***/
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
    favteamId,
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
    !admin ||
    !totaalToto ||
    !favteamId
  )
    return res.status(400).send('Please provide all the details');

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
      favteamId,
    });

    const newUser = await User.findOne({
      where: { email },
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    delete newUser.dataValues['password'];

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({
      userData: {
        token,
        ...newUser.dataValues,
      },
      message: `Welcome ${newUser.userName}, a user profile has been created`,
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
  const { email, password, newPassword1, newPassword2 } = req.body;

  if (!email || !password || !newPassword1 || !newPassword2)
    return res
      .status(400)
      .send({ message: 'Please provide email and passwords' });

  if (newPassword1 !== newPassword2)
    return res
      .status(400)
      .send({ message: 'Please confirm you new password!' });

  if (password === newPassword1)
    return res
      .status(400)
      .send({ message: 'You new new password must differ from the old one!' });

  try {
    const user = req.user;
    await user.update({
      password: bcrypt.hashSync(newPassword1, SALT_ROUNDS),
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
router.patch('/me/profile', async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
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
    !password ||
    !phoneNumber ||
    !admin ||
    !totaalToto ||
    !favteamId
  )
    return res.status(400).send('Some data is missing, please try again');

  try {
    const userToUpdate = await User.findOne({
      where: { email },
    });

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
