const { errorHandlers } = require('../../utils');
const catchAsync = require('../../utils/catchAsync');
const { fixtureQueries } = require('../../queries');
const { predictionQueries } = require('../../queries');
const validatePredictionInput = require('../../validators/validatePredictionInput');
const validateFixtureStatus = require('../../validators/validateFixtureStatus');

const { AppError } = errorHandlers;
const { getFixtureQuery } = fixtureQueries;
const { createPredictionQuery } = predictionQueries;

module.exports = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!validatePredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Missing details, please try again!', 404));
  }

  const fixture = await getFixtureQuery(fixtureId);

  // TODO: BUILD TIME GUARD
  if (!validateFixtureStatus(fixture.status, next)) {
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
