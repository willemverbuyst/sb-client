const catchAsync = require('../../utils/catchAsync');
const { fixtureQueries } = require('../../queries');
const { predictionQueries } = require('../../queries');
const AppError = require('../../utils/appError');

const { getAllPredictionsAndScoresForFixtureQuery } = predictionQueries;

const { getFixtureQuery } = fixtureQueries;

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
