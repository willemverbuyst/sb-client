const catchAsync = require('../utils/catchAsync');
const {
  getScoresPlayer,
  getScoresRound,
  getScoresTotalToto,
  getScoresTotoRound,
} = require('../queries/predictionQuery');
const { getUserById } = require('../queries/userQuery');
const { nextMonday } = require('../utils/date.functions');
const AppError = require('../utils/appError');

exports.getScoresPlayer = catchAsync(async (req, res, _next) => {
  const playerId = req.params.id;

  const scores = await getScoresPlayer(playerId);
  const { userName } = await getUserById(playerId);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      id: playerId,
      name: userName,
      scores,
    },
  });
});

exports.getScoresRound = catchAsync(async (req, res, _next) => {
  const roundNumber = req.params.id;
  const scores = await getScoresRound(roundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      roundNumber,
    },
  });
});

exports.getScoresTotalToto = catchAsync(async (req, res, _next) => {
  const scores = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
    },
  });
});

exports.getScoresTotoRound = catchAsync(async (req, res, _next) => {
  const totoRoundNumber = req.params.id;
  const scores = await getScoresTotoRound(totoRoundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      totoRoundNumber,
    },
  });
});
