const { fixtureQueries, predictionQueries } = require('../../queries');
const { asyncHandler, errorHandlers, validators } = require('../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { createPredictionQuery } = predictionQueries;
const { isValidFixtureStatus, isValidPredictionInput } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!isValidPredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Missing details, please try again!', 404));
  }

  const fixture = await getFixtureQuery(fixtureId);

  // TODO: BUILD TIME GUARD
  if (!isValidFixtureStatus(fixture.status, next)) {
    return next(
      new AppError(
        'You cannot post a prediction of a match that has finsihed already!',
        404,
      ),
    );
  }

  const prediction = await createPredictionQuery(
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    fixtureId,
    userId,
  );

  res.status(201).json({
    status: 'success',
    data: {
      prediction,
    },
    message: 'You have posted a prediction.',
  });
});
