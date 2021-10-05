const catchAsync = require('../../utils/catchAsync');
const { getAllTeams } = require('../../queries/teamQuery');
const AppError = require('../../utils/appError');

module.exports = catchAsync(async (_req, res, next) => {
  const teams = await getAllTeams();

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
