const catchAsync = require('../../utils/catchAsync');
const { predictionQueries } = require('../../queries');

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
