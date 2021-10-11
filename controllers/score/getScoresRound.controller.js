const catchAsync = require('../../utils/catchAsync');
const { predictionQueries } = require('../../queries');

const { getScoresRoundQuery } = predictionQueries;

module.exports = catchAsync(async (req, res, _next) => {
  const roundNumber = req.params.id;
  const scores = await getScoresRoundQuery(roundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      roundNumber,
    },
  });
});
