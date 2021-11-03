const { fixtureQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus404: { PlayerNotFoundError },
  ErrorStatus422: { InvalidPlayerIdlError },
} = errorHandlers;
const { getAllFixturesWithPredictionQuery } = fixtureQueries;
const { getUserByIdQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;
  const userId = req.user.dataValues.id;

  if (!isValidUUID(playerId)) {
    return next(new InvalidPlayerIdlError());
  }

  const { userName } = await getUserByIdQuery(playerId);

  if (!userName) {
    return next(new PlayerNotFoundError());
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
