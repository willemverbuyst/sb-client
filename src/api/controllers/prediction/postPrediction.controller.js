const { fixtureQueries, predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { createPredictionQuery } = predictionQueries;
const { isValidFixtureId, isValidFixtureStatus, isValidPredictionInput } =
  validators;

module.exports = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!isValidFixtureId(fixtureId)) {
    return next(new AppError('This is not a valid fixture id', 404));
  }

  if (!isValidPredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Missing details, please try again!', 404));
  }

  const fixture = await getFixtureQuery(fixtureId);

  if (!fixture) {
    return next(new AppError('The fixture with this id was not found', 404));
  }

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
