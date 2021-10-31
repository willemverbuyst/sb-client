const { fixtureQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getAllFixturesWithPredictionQuery } = fixtureQueries;
const { getUserByIdQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;
  const userId = req.user.dataValues.id;

  if (!isValidUUID(playerId)) {
    return next(new AppError('This is not a valid player id!', 422));
  }

  const { userName } = await getUserByIdQuery(playerId);

  if (!userName) {
    return next(new AppError('No player found with this id!', 404));
  }

  const fixtures = await getAllFixturesWithPredictionQuery(playerId, userId);

  res.status(200).json({
    status: 'success',
    result: fixtures.length,
    data: {
      player: userName,
      fixtures,
    },
  });
});
