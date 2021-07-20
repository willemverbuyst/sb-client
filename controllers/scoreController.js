const catchAsync = require('../utils/catchAsync');
const {
  getScoresTotalToto,
  getScoresTotoRound,
} = require('../queries/predictionQuery');

exports.getScoresRound = catchAsync(async (req, res, next) => {
  const scoresRound = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scoresRound.length,
    data: {
      scoresRound,
    },
  });
});

exports.getScoresTotalToto = catchAsync(async (req, res, next) => {
  const scoresTotalToto = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scoresTotalToto.length,
    data: {
      scoresTotalToto,
    },
  });
});

exports.getScoresTotoRound = catchAsync(async (req, res, next) => {
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
