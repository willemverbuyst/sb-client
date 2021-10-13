const { predictionQueries } = require('../../queries');
const { asyncHandler } = require('../../utils');

const { catchAsync } = asyncHandler;
const { getScoresTotoRoundQuery } = predictionQueries;

module.exports = catchAsync(async (req, res, _next) => {
  const totoRoundNumber = req.params.id;
  const scores = await getScoresTotoRoundQuery(totoRoundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      totoRoundNumber,
    },
  });
});
