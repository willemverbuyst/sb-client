const catchAsync = require('../../utils/catchAsync');
const { getScoresRound } = require('../../queries/predictionQuery');

module.exports = catchAsync(async (req, res, _next) => {
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
