const { teamQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { NoTeammsFoundError } = errorHandlers;
const { getAllTeamsQuery } = teamQueries;

module.exports = catchAsync(async (_req, res, next) => {
  const teams = await getAllTeamsQuery();

  if (!teams) {
    return next(new NoTeammsFoundError());
  }

  res.status(200).json({
    status: 'success',
    results: teams.length,
    data: {
      teams,
    },
  });
});
