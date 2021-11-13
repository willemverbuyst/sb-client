const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus404: { PlayerNotFoundError },
  ErrorStatus422: { InvalidPlayerIdlError },
} = errorHandlers;
const { deleteUserAndHisPredictionQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const { playerId } = req.params;

  if (!isValidUUID(playerId)) {
    return next(new InvalidPlayerIdlError());
  }

  const player = await deleteUserAndHisPredictionQuery(playerId);

  if (!player) {
    return next(new PlayerNotFoundError());
  }

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'Player has been removed.',
  });
});
