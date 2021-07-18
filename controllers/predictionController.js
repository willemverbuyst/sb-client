const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getFixture } = require('../queries/fixtureQuery');
const {
  createPrediction,
  updatePrediction,
} = require('../queries/predictionQuery');
const { validatePredictionInput } = require('../validators/inputValidator');
const { validateFixtureStatus } = require('../validators/queryValidator');

exports.postPrediction = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!validatePredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const fixture = await getFixture(fixtureId);

  if (!validateFixtureStatus(fixture.status, next)) {
    return next(
      new AppError(
        'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
        404,
      ),
    );
  }

  const prediction = await createPrediction(
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
    message: 'Je voorspelling is geplaatst.',
  });
});

exports.updatePrediction = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!validatePredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const fixture = await getFixture(fixtureId);

  if (!validateFixtureStatus(fixture.status, next)) {
    return next(
      new AppError(
        'Je kan de uitslag van een afgelopen wedstrijd niet wijzigen!',
        404,
      ),
    );
  }

  const prediction = await updatePrediction(
    pGoalsHomeTeam,
    pGoalsHomeTeam,
    fixtureId,
    userId,
  );

  res.status(200).json({
    status: 'success',
    data: {
      prediction,
    },
    message: 'Je voorspelling is aangepast.',
  });
});
