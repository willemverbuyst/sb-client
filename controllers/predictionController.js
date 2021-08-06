const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFixturesWithPrediction,
  getFixture,
} = require('../queries/fixtureQuery');
const {
  createPrediction,
  updatePrediction,
} = require('../queries/predictionQuery');
const { getUserById } = require('../queries/userQuery');
const validatePredictionInput = require('../validators/validatePredictionInput');
const validateFixtureStatus = require('../validators/validateFixtureStatus');

exports.getAllPredictions = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;
  const userId = req.user.dataValues.id;

  const { userName } = await getUserById(playerId);

  if (!userName) {
    return next(new AppError('No player found with this id!', 404));
  }

  const fixtures = await getAllFixturesWithPrediction(playerId, userId);

  if (!fixtures) {
    return next(new AppError('No predictions found', 404));
  }

  res.status(200).json({
    status: 'success',
    result: fixtures.length,
    data: {
      player: userName,
      fixtures,
    },
  });
});

exports.postPrediction = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const fixtureId = req.params.id;
  const { pGoalsHomeTeam, pGoalsAwayTeam } = req.body;

  if (!validatePredictionInput(pGoalsHomeTeam, pGoalsAwayTeam, fixtureId)) {
    return next(new AppError('Missing details, please try again!', 404));
  }

  const fixture = await getFixture(fixtureId);

  // TODO: BUILD TIME GUARD
  if (!validateFixtureStatus(fixture.status, next)) {
    return next(
      new AppError(
        'You cannot post a prediction of a match that has finsihed already!',
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
    message: 'You have posted a prediction.',
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
