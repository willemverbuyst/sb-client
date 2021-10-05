const catchAsync = require('../../utils/catchAsync');
const { getScoresTotoRound } = require('../../queries/predictionQuery');

module.exports = catchAsync(async (req, res, _next) => {
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
