const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;

const { Op } = require('sequelize');
const {
  lastMonday,
  nextMonday,
  getTotoRoundNumber,
} = require('../utils/helper-functions');
const { toJWT } = require('../auth/jwt');
const { getUserByEmail } = require('../queries/userQuery');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await getUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }

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

  const token = toJWT({ userId: user.email });

  res.status(200).json({
    status: 'success',
    data: {
      currentRound,
      user,
    },
    message: `Welcome back ${user.userName}`,
    token,
  });
});
