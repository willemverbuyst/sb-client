const { predictionQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getScoresPlayerQuery } = predictionQueries;
const { getUserByIdQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;

  const { userName } = await getUserByIdQuery(playerId);

  if (!userName) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  const scores = await getScoresPlayerQuery(playerId);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      id: playerId,
      name: userName,
      scores,
    },
  });
});
