const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const calculateScore = require('../utils/calc-scores');
const { Op } = require('sequelize');
const reducer = require('../utils/reducer');
const {
  chunkArrayTotoRounds,
  lastMonday,
} = require('../utils/helper-functions');

const createPrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
  userId,
) => {
  // To prevent multiple predictions, check if it exists already
  const predictionExists = await Prediction.findOne({
    where: { fixtureId, userId },
  });

  // If so use updatePrediction instead
  if (predictionExists) {
    const prediction = await updatePrediction(
      pGoalsHomeTeam,
      pGoalsAwayTeam,
      fixtureId,
      userId,
    );
    return prediction;
  }

  // If it does not exist, create a new prediction
  const createdPrediction = await Prediction.create({
    pGoalsHomeTeam: pGoalsHomeTeam,
    pGoalsAwayTeam: pGoalsAwayTeam,
    userId,
    fixtureId: fixtureId,
  });

  const prediction = {
    pGoalsAwayTeam: createdPrediction.pGoalsAwayTeam,
    pGoalsHomeTeam: createdPrediction.pGoalsHomeTeam,
    fixtureId: createdPrediction.fixtureId,
  };

  return prediction;
};

const getAllPredictionsForFixture = async (fixture) => {
  const predictions = await Prediction.findAll({
    where: { fixtureId: fixture.id },
    include: [{ model: User, attributes: ['userName', 'id'] }],
    raw: true,
    nest: true,
  });

  if (fixture.status !== 'Match Finished' || !(predictions.length > 0)) {
    return null;
  }

  const predictionsWithScores = predictions.map((prediction) => {
    return {
      ...prediction,
      score: calculateScore(
        {
          homeTeam: fixture.goalsHomeTeam,
          awayTeam: fixture.goalsAwayTeam,
        },
        {
          homeTeam: prediction.pGoalsHomeTeam,
          awayTeam: prediction.pGoalsAwayTeam,
        },
      ),
    };
  });

  const scores = predictionsWithScores.map((predictionsWithScore) => {
    return {
      pGoalsHomeTeam: predictionsWithScore.pGoalsHomeTeam,
      pGoalsAwayTeam: predictionsWithScore.pGoalsAwayTeam,
      score: predictionsWithScore.score,
      user: predictionsWithScore.user.userName,
      userId: predictionsWithScore.user.id,
    };
  });

  return scores;
};

const updatePrediction = async (
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  fixtureId,
  userId,
) => {
  const updatedPrediction = await Prediction.update(
    {
      pGoalsHomeTeam: pGoalsHomeTeam,
      pGoalsAwayTeam: pGoalsAwayTeam,
    },
    { where: { fixtureId, userId }, returning: true, plain: true },
  );

  const prediction = {
    pGoalsAwayTeam: updatedPrediction[1].dataValues.pGoalsAwayTeam,
    pGoalsHomeTeam: updatedPrediction[1].dataValues.pGoalsHomeTeam,
    fixtureId: updatedPrediction[1].dataValues.fixtureId,
  };

  return prediction;
};

const getScoresTotalToto = async () => {
  const predictions = await Prediction.findAll({
    attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam'],
    include: [
      {
        model: Fixture,
        where: {
          status: 'Match Finished',
          goalsHomeTeam: {
            [Op.ne]: null,
          },
          goalsAwayTeam: {
            [Op.ne]: null,
          },
        },
      },
      { model: User, attributes: ['userName', 'id', 'totaalToto'] },
    ],
    raw: true,
    nest: true,
  });

  if (predictions.length > 0) {
    const predictionsWithScores = [...predictions]
      .filter((pred) => pred.user.totaalToto)
      .map((pred) => {
        return {
          ...pred,
          score: calculateScore(
            {
              homeTeam: pred.fixture.goalsHomeTeam,
              awayTeam: pred.fixture.goalsAwayTeam,
            },
            {
              homeTeam: pred.pGoalsHomeTeam,
              awayTeam: pred.pGoalsAwayTeam,
            },
          ),
          user: pred.user.userName,
          userId: pred.user.id,
        };
      });

    let scoresTotalToto = reducer(predictionsWithScores);

    return scoresTotalToto;
  } else {
    return [];
  }
};

const getScoresPlayer = async (playerId) => {
  const timeStampLastMonday = lastMonday();

  const fixtures = await Fixture.findAll({
    where: {
      eventTimeStamp: {
        [Op.lt]: [timeStampLastMonday],
      },
    },
    order: [['id', 'ASC']],
  });

  const fixturesWithPredictions = await Fixture.findAll({
    where: {
      id: {
        [Op.lte]: fixtures[fixtures.length - 1].id,
      },
    },
    include: [
      {
        model: Prediction,
        where: {
          userId: playerId,
        },
        required: false,
      },
    ],
    order: [['id', 'ASC']],
    raw: true,
    nest: true,
  });

  if (fixtures.length > 0) {
    const fixturesWithScores = fixturesWithPredictions.map((fixture) => {
      return {
        score: calculateScore(
          {
            homeTeam: fixture.goalsHomeTeam,
            awayTeam: fixture.goalsAwayTeam,
          },
          {
            homeTeam: fixture.predictions.pGoalsHomeTeam,
            awayTeam: fixture.predictions.pGoalsAwayTeam,
          },
        ),
      };
    });

    const chunkedScores = chunkArrayTotoRounds(fixturesWithScores);

    const scores = chunkedScores.map((totoround) =>
      totoround.map((round) => round.reduce((a, b) => a + b.score, 0)),
    );
    return scores;
  } else {
    return [];
  }
};

const getScoresRound = async (roundNumber) => {
  const season = `Regular Season - ${roundNumber}`;

  const predictions = await Prediction.findAll({
    attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam'],
    include: [
      {
        model: Fixture,
        where: {
          status: 'Match Finished',
          goalsHomeTeam: {
            [Op.ne]: null,
          },
          goalsAwayTeam: {
            [Op.ne]: null,
          },
          round: season,
        },
      },
      { model: User, attributes: ['userName', 'id'] },
    ],
    raw: true,
    nest: true,
  });

  if (predictions.length > 0) {
    const predictionsWithScores = predictions.map((pred) => {
      return {
        ...pred,
        score: calculateScore(
          {
            homeTeam: pred.fixture.goalsHomeTeam,
            awayTeam: pred.fixture.goalsAwayTeam,
          },
          {
            homeTeam: pred.pGoalsHomeTeam,
            awayTeam: pred.pGoalsAwayTeam,
          },
        ),
        user: pred.user.userName,
        userId: pred.user.id,
      };
    });

    const predictionsReduced = reducer(predictionsWithScores);
    const round = {
      usersWithScores: predictionsReduced,
      roundNumber,
    };

    return round;
  } else {
    const round = {
      usersWithScores: predictions,
      roundNumber,
    };

    return round;
  }
};

const getScoresTotoRound = async (totoRoundNumber) => {
  const rounds = [
    totoRoundNumber * 3 - 2,
    totoRoundNumber * 3 - 1,
    totoRoundNumber * 3,
  ];
  if (Number(totoRoundNumber) === 11) rounds.push(totoRoundNumber * 3 + 1);

  const seasons = rounds.map((a) => `Regular Season - ${a}`);

  const predictions = await Prediction.findAll({
    attributes: ['pGoalsHomeTeam', 'pGoalsAwayTeam'],
    include: [
      {
        model: Fixture,
        where: {
          status: 'Match Finished',
          goalsHomeTeam: {
            [Op.ne]: null,
          },
          goalsAwayTeam: {
            [Op.ne]: null,
          },
          round: { [Op.in]: seasons },
        },
      },
      { model: User, attributes: ['userName', 'id'] },
    ],
    raw: true,
    nest: true,
  });

  if (predictions.length > 0) {
    const predictionsWithScores = predictions.map((pred) => {
      return {
        ...pred,
        score: calculateScore(
          {
            homeTeam: pred.fixture.goalsHomeTeam,
            awayTeam: pred.fixture.goalsAwayTeam,
          },
          {
            homeTeam: pred.pGoalsHomeTeam,
            awayTeam: pred.pGoalsAwayTeam,
          },
        ),
        user: pred.user.userName,
        userId: pred.user.id,
      };
    });

    const predictionsReduced = reducer(predictionsWithScores);

    const totoRound = {
      usersWithScores: predictionsReduced,
      totoRoundNumber,
    };

    return totoRound;
  } else {
    const totoRound = {
      usersWithScores: predictions,
      totoRoundNumber,
    };
    return totoRound;
  }
};

module.exports = {
  createPrediction,
  getAllPredictionsForFixture,
  getScoresPlayer,
  getScoresRound,
  getScoresTotalToto,
  getScoresTotoRound,
  updatePrediction,
};
