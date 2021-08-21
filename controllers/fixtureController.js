const catchAsync = require('../utils/catchAsync');
const { getFixture } = require('../queries/fixtureQuery');
const {
  getAllPredictionsAndScoresForFixture,
} = require('../queries/predictionQuery');
const AppError = require('../utils/appError');

exports.getFixtureWithScores = catchAsync(async (req, res, next) => {
  const fixtureId = req.params.id;
  const fixture = await getFixture(fixtureId);

  if (!fixture) {
    return next(new AppError('That fixture was not found', 404));
  }
  const scores = await getAllPredictionsAndScoresForFixture(fixture);

  res.status(200).json({
    status: 'success',
    data: {
      fixture,
      scores,
    },
  });
});
