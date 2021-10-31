const { fixtureQueries, predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { updatePredictionQuery } = predictionQueries;
const {
  isValidFixtureId,
  isValidFixtureStatus,
  isValidOpenToBet,
  isValidPredictionInput,
} = validators;

module.exports = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!isValidFixtureId(fixtureId)) {
    return next(new AppError('This is not a valid fixture id', 422));
  }

  if (!isValidPredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Details are missing try again!', 422));
  }

  const fixture = await getFixtureQuery(fixtureId);

  if (!fixture) {
    return next(new AppError('No fixture found with this id', 404));
  }

  if (!isValidFixtureStatus(fixture.status, next)) {
    return next(new AppError('This fixture is closed for betting!', 403));
  }

  // Timestamp in seconds
  const currentTimeStamp = Math.floor(Date.now() / 1000);

  if (!isValidOpenToBet(currentTimeStamp, fixture.eventTimeStamp)) {
    return next(new AppError('This fixture is closed for betting!', 403));
  }

  const prediction = await updatePredictionQuery(
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
