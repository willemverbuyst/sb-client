const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus500: { NoPlayersFoundError },
} = errorHandlers;
const { getAllUsersQuery } = userQueries;

module.exports = catchAsync(async (_req, res, next) => {
  const players = await getAllUsersQuery();

  if (!players) {
    return next(new NoPlayersFoundError());
  }

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: {
      players,
    },
  });
});
