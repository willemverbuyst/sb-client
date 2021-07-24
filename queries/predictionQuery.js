const { Op } = require('sequelize');
const Fixture = require('../models').fixture;
const Prediction = require('../models').prediction;
const User = require('../models').user;
const { lastMonday } = require('../utils/date.functions');
const { chunkArrayTotoRounds, reducer } = require('../utils/helper.functions');
const { calculateScore } = require('../utils/scores.functions');

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

const getAllPredictionsAndScoresForFixture = async (fixture) => {
  const predictions = await Prediction.findAll({
    where: { fixtureId: fixture.id },
    include: [{ model: User, attributes: ['userName', 'id'] }],
    raw: true,
    nest: true,
  });

  if (fixture.status !== 'Match Finished' || !(predictions.length > 0)) {
    return null;
  }

  const predictionsWithScores = predictions.map((prediction) => ({
    name: prediction.user.userName,
    id: prediction.user.id,
    pGoalsHomeTeam: prediction.pGoalsHomeTeam,
    pGoalsAwayTeam: prediction.pGoalsAwayTeam,
    score: calculateScore(
      fixture.goalsHomeTeam,
      fixture.goalsAwayTeam,
      prediction.pGoalsHomeTeam,
      prediction.pGoalsAwayTeam,
    ),
  }));

  return predictionsWithScores;
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
      .filter((prediction) => prediction.user.totaalToto)
      .map((prediction) => ({
        score: calculateScore(
          prediction.fixture.goalsHomeTeam,
          prediction.fixture.goalsAwayTeam,
          prediction.pGoalsHomeTeam,
          prediction.pGoalsAwayTeam,
        ),
        name: prediction.user.userName,
        id: prediction.user.id,
      }));

    const scoresTotalToto = reducer(predictionsWithScores);

    return scoresTotalToto;
  }
  return [];
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

  if (fixtures.length > 0) {
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

    const fixturesWithScores = fixturesWithPredictions.map((fixture) => ({
      score: calculateScore(
        fixture.goalsHomeTeam,
        fixture.goalsAwayTeam,
        fixture.predictions.pGoalsHomeTeam,
        fixture.predictions.pGoalsAwayTeam,
      ),
    }));

    const chunkedScores = chunkArrayTotoRounds(fixturesWithScores);

    const scores = chunkedScores.map((totoround) =>
      totoround.map((round) => round.reduce((a, b) => a + b.score, 0)),
    );
    return scores;
  }
  return [];
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
    const predictionsWithScores = predictions.map((pred) => ({
      score: calculateScore(
        pred.fixture.goalsHomeTeam,
        pred.fixture.goalsAwayTeam,
        pred.pGoalsHomeTeam,
        pred.pGoalsAwayTeam,
      ),
      name: pred.user.userName,
      id: pred.user.id,
    }));

    const predictionsReduced = reducer(predictionsWithScores);
    return predictionsReduced;
  }
  return predictions;
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
    const predictionsWithScores = predictions.map((pred) => ({
      score: calculateScore(
        pred.fixture.goalsHomeTeam,
        pred.fixture.goalsAwayTeam,
        pred.pGoalsHomeTeam,
        pred.pGoalsAwayTeam,
      ),
      name: pred.user.userName,
      id: pred.user.id,
    }));

    const predictionsReduced = reducer(predictionsWithScores);

    return predictionsReduced;
  }
  return predictions;
};

module.exports = {
  createPrediction,
  getAllPredictionsAndScoresForFixture,
  getScoresPlayer,
  getScoresRound,
  getScoresTotalToto,
  getScoresTotoRound,
  updatePrediction,
};
