const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { getFixture } = require('../../queries/fixtureQuery');
const { updatePrediction } = require('../../queries/predictionQuery');
const validatePredictionInput = require('../../validators/validatePredictionInput');
const validateFixtureStatus = require('../../validators/validateFixtureStatus');

module.exports = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!validatePredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const fixture = await getFixture(fixtureId);

  // TODO: BUILD TIME GUARD
  if (!validateFixtureStatus(fixture.status, next)) {
    return next(
      new AppError(
        'You cannot change a prediction of a match that has finsihed already!',
        404,
      ),
    );
  }

  const prediction = await updatePrediction(
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    fixtureId,
    userId,
  );

  res.status(200).json({
    status: 'success',
    data: {
      prediction,
    },
    message: 'Your prediction has been updated.',
  });
});
