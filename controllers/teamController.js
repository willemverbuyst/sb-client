const catchAsync = require('../utils/catchAsync');
const { getAllTeams } = require('../queries/teamQuery');

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await getAllTeams();

  res.status(200).json({
    status: 'success',
    results: teams.length,
    data: {
      teams,
    },
  });
});
