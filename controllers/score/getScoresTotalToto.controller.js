const { predictionQueries } = require('../../queries');
const { asyncHandler } = require('../../utils');

const { catchAsync } = asyncHandler;
const { getScoresTotalTotoQuery } = predictionQueries;

module.exports = catchAsync(async (_req, res, _next) => {
  const scores = await getScoresTotalTotoQuery();

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
    },
  });
});
