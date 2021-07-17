const catchAsync = require('../utils/catchAsync');
const Team = require('../models').team;
const { getTeams } = require('../queries/teamQuery');

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await getTeams();

  res.status(200).json({
    status: 'success',
    data: {
      teams,
    },
  });
});
