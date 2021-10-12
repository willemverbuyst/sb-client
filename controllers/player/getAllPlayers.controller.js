const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { userQueries } = require('../../queries');

const { getAllUsersQuery } = userQueries;

module.exports = catchAsync(async (_req, res, next) => {
  const players = await getAllUsersQuery();

  if (!players) {
    return next(new AppError('No players found!', 404));
  }

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: {
      players,
    },
  });
});
