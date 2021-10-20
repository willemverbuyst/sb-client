const { fixtureQueries, predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { getAllPredictionsAndScoresForFixtureQuery } = predictionQueries;

module.exports = catchAsync(async (req, res, next) => {
  const fixtureId = req.params.id;
  const fixture = await getFixtureQuery(fixtureId);

  if (!fixture) {
    return next(new AppError('That fixture was not found', 404));
  }

  const scores = await getAllPredictionsAndScoresForFixtureQuery(fixture);

  res.status(200).json({
    status: 'success',
    data: {
      fixture,
      scores,
    },
  });
});
