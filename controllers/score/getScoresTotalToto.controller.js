const catchAsync = require('../../utils/catchAsync');
const { getScoresTotalToto } = require('../../queries/predictionQuery');

module.exports = catchAsync(async (req, res, _next) => {
  const scores = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
    },
  });
});
