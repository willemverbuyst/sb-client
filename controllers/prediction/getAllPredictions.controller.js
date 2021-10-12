const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { fixtureQueries, userQueries } = require('../../queries');

const { getAllFixturesWithPredictionQuery } = fixtureQueries;
const { getUserByIdQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;
  const userId = req.user.dataValues.id;

  const { userName } = await getUserByIdQuery(playerId);

  if (!userName) {
    return next(new AppError('No player found with this id!', 404));
  }

  const fixtures = await getAllFixturesWithPredictionQuery(playerId, userId);

  res.status(200).json({
    status: 'success',
    result: fixtures.length,
    data: {
      player: userName,
      fixtures,
    },
  });
});
