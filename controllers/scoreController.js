const catchAsync = require('../utils/catchAsync');
const {
  getScoresRound,
  getScoresTotalToto,
  getScoresTotoRound,
} = require('../queries/predictionQuery');

exports.getScoresRound = catchAsync(async (req, res, _next) => {
  const roundNumber = req.params.id;
  const scoresRound = await getScoresRound(roundNumber);

  res.status(200).json({
    status: 'success',
    results: scoresRound.length,
    data: {
      scoresRound,
    },
  });
});

exports.getScoresTotalToto = catchAsync(async (req, res, _next) => {
  const scoresTotalToto = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scoresTotalToto.length,
    data: {
      scoresTotalToto,
    },
  });
});

exports.getScoresTotoRound = catchAsync(async (req, res, _next) => {
  const totoRoundNumber = req.params.id;
  const scoresTotoRound = await getScoresTotoRound(totoRoundNumber);

  res.status(200).json({
    status: 'success',
    results: scoresTotoRound.length,
    data: {
      scoresTotoRound,
    },
  });
});
