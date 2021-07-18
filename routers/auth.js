const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');

const authMiddleware = require('../auth/authMiddleware');
const Team = require('../models').team;
const User = require('../models').user;
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const { Op } = require('sequelize');
const {
  lastMonday,
  nextMonday,
  chunkArrayTotoRounds,
  getTotoRoundNumber,
} = require('../utils/helper-functions');

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const calcScores = require('../utils/calc-scores');
const router = new Router();

//####REFACTORED
/*** LOGIN ***/
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: 'Vul email en wachtwoord in!' });

  try {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(400).send({
        message:
          'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
      });

    delete user.dataValues['password'];

    const token = toJWT({ userId: user.id });

    const timeStampLastMonday = lastMonday();
    const timeStampNextMonday = nextMonday();

    const fixturesWithPrediction = await Fixture.findAll({
      where: {
        eventTimeStamp: {
          [Op.between]: [timeStampLastMonday, timeStampNextMonday],
        },
        status: 'Not Started',
      },
      include: {
        model: Prediction,
        where: { userId: user.id },
        attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
        required: false,
      },
      raw: true,
      nest: true,
    });

    const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
      return {
        ...fix,
        score: calcScores(
          fix.status,
          { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
          {
            homeTeam: fix.predictions.pGoalsHomeTeam,
            awayTeam: fix.predictions.pGoalsAwayTeam,
          },
        ),
      };
    });

    let currentRound = null;

    if (fixturesWithPredictionAndScore.length > 0) {
      const roundNumber = fixturesWithPredictionAndScore[0].round.slice(-2);
      const totoRoundNumber = getTotoRoundNumber(roundNumber);

      currentRound = {
        roundNumber,
        totoRoundNumber,
        fixtures: fixturesWithPredictionAndScore,
      };
    }

    return res.status(200).send({
      userData: { token, ...user.dataValues, currentRound },
      message: `Welcome back ${user.userName}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

//####REFACTORED
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
      .send({ message: 'Je moet een admin zijn voor dit verzoek!' });

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !teamId
  ) {
    return res
      .status(400)
      .send({ message: 'Details ontbreken, probeer opnieuw!' });
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
        'id',
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
      message: `Er is een nieuw account gemaakt voor ${newUser.dataValues.userName}.`,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return res
        .status(400)
        .send({ message: 'Er is al een account met dit emailadres.' });

    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

/*** GET INFO USER IF THERE IS A JWT TOKEN ***/
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const timeStampLastMonday = lastMonday();
    const timeStampNextMonday = nextMonday();

    const fixturesWithPrediction = await Fixture.findAll({
      where: {
        eventTimeStamp: {
          [Op.between]: [timeStampLastMonday, timeStampNextMonday],
        },
        status: 'Not Started',
      },
      include: {
        model: Prediction,
        where: { userId: req.user.dataValues.id },
        attributes: ['pGoalsAwayTeam', 'pGoalsHomeTeam'],
        required: false,
      },
      raw: true,
      nest: true,
    });

    const fixturesWithPredictionAndScore = fixturesWithPrediction.map((fix) => {
      return {
        ...fix,
        score: calcScores(
          fix.status,
          { homeTeam: fix.goalsHomeTeam, awayTeam: fix.goalsAwayTeam },
          {
            homeTeam: fix.predictions.pGoalsHomeTeam,
            awayTeam: fix.predictions.pGoalsAwayTeam,
          },
        ),
      };
    });

    let currentRound = null;

    if (fixturesWithPredictionAndScore.length > 0) {
      const roundNumber = fixturesWithPredictionAndScore[0].round.slice(-2);
      const totoRoundNumber = getTotoRoundNumber(roundNumber);

      currentRound = {
        roundNumber,
        totoRoundNumber,
        fixtures: fixturesWithPredictionAndScore,
      };
    }

    delete req.user.dataValues['password'];
    res.status(200).send({ ...req.user.dataValues, currentRound });
  } catch (error) {
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

/*** CHANGE PASSWORD BY USER ***/
router.patch('/me/password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword)
    return res.status(400).send({ message: 'Vul nieuw wachtwoord in!' });

  if (bcrypt.compareSync(newPassword, req.user.password))
    return res.status(400).send({
      message: 'Je oude en nieuwe wachtwoord mag niet hetzelfde zijn!',
    });

  try {
    const user = req.user;
    await user.update({
      password: bcrypt.hashSync(newPassword, SALT_ROUNDS),
    });

    return res.status(200).send({
      message: 'Je wachtwoord is gewijzigd.',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

/*** UPDATE USER DETAILS BY USER ***/
router.patch('/me/profile', authMiddleware, async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    admin,
    totaalToto,
    teamId,
  } = req.body;

  if (!userName || !firstName || !lastName || !email || !phoneNumber || !teamId)
    return res
      .status(400)
      .send({ message: 'Details ontbreken, probeer opnieuw!' });

  try {
    const userToUpdate = req.user;

    await userToUpdate.update({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      admin,
      totaalToto,
      teamId,
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
      message: 'Je profiel is gewijzigd.',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

router.get('/test', async (_req, res) => {
  try {
    return res.status(200).send({ message: 'testing' });
  } catch (error) {
    return res.status(400).send({ message: 'Er ging iets mis, sorry.' });
  }
});

module.exports = router;
