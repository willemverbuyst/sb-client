const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getAllUsersQuery } = userQueries;

module.exports = catchAsync(async (_req, res, next) => {
  const players = await getAllUsersQuery();

  if (!players) {
    return next(new AppError('No players found!', 500));
  }

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: {
      players,
    },
  });
});
