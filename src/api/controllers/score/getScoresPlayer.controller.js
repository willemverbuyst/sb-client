const { predictionQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus404: { PlayerNotFoundError },
  ErrorStatus422: { InvalidPlayerIdlError },
} = errorHandlers;
const { getScoresPlayerQuery } = predictionQueries;
const { getUserByIdQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const { playerId } = req.params;

  if (!isValidUUID(playerId)) {
    return next(new InvalidPlayerIdlError());
  }

  const user = await getUserByIdQuery(playerId);

  if (!user) {
    return next(new PlayerNotFoundError());
  }

  const scores = await getScoresPlayerQuery(playerId);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      id: playerId,
      name: user.userName,
      scores,
    },
  });
});
