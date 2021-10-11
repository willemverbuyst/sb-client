const catchAsync = require('../../utils/catchAsync');
const { teamQueries } = require('../../queries');
const AppError = require('../../utils/appError');

const { getAllTeamsQuery } = teamQueries;

module.exports = catchAsync(async (_req, res, next) => {
  const teams = await getAllTeamsQuery();

  if (!teams) {
    return next(
      new AppError('Geen teams gevonden, probeer het later nog eens.', 500),
    );
  }

  res.status(200).json({
    status: 'success',
    results: teams.length,
    data: {
      teams,
    },
  });
});
