const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getFixture } = require('../queries/fixtureQuery');
const { getAllPredictionsForFixture } = require('../queries/predictionQuery');

/*** GET THE SCORE OF EACH USER FOR A SPECIFIC PAST FIXTURE ***/
/*** PUBLIC ***/

exports.getFixtureWithScores = catchAsync(async (req, res, next) => {
  const fixture = await getFixture(req.params.id);
  const scores = await getAllPredictionsForFixture(fixture);

  res.status(200).json({
    status: 'success',
    data: {
      scores,
    },
  });
});
