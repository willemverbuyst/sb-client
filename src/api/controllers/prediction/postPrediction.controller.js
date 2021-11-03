const { fixtureQueries, predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus403: { BettingClosedError },
  ErrorStatus404: { FixtureNotFoundError },
  ErrorStatus422: { DetailsMissingError, InvalidFixtureIdError },
} = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { createPredictionQuery } = predictionQueries;
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
    return next(new InvalidFixtureIdError());
  }

  if (!isValidPredictionInput(pGoalsHomeTeam, pGoalsAwayTeam)) {
    return next(new DetailsMissingError());
  }

  const fixture = await getFixtureQuery(fixtureId);

  if (!fixture) {
    return next(new FixtureNotFoundError());
  }

  if (!isValidFixtureStatus(fixture.status)) {
    return next(new BettingClosedError());
  }

  // Timestamp in seconds
  const currentTimeStamp = Math.floor(Date.now() / 1000);

  if (!isValidOpenToBet(currentTimeStamp, fixture.eventTimeStamp)) {
    return next(new BettingClosedError());
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
    message: 'Your prediction has been posted.',
  });
});
