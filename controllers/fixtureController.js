const catchAsync = require('../utils/catchAsync');
const { getFixture } = require('../queries/fixtureQuery');
const {
  getAllPredictionsAndScoresForFixture,
} = require('../queries/predictionQuery');

exports.getFixtureWithScores = catchAsync(async (req, res, _next) => {
  const fixtureId = req.params.id;
  const fixture = await getFixture(fixtureId);
  const scores = await getAllPredictionsAndScoresForFixture(fixture);

  res.status(200).json({
    status: 'success',
    data: {
      fixture,
      scores,
    },
  });
});
