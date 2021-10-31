const { predictionQueries, userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getScoresPlayerQuery } = predictionQueries;
const { getUserByIdQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;

  if (!isValidUUID(playerId)) {
    return next(new AppError('This is not a valid player id!', 422));
  }

  const { userName } = await getUserByIdQuery(playerId);

  if (!userName) {
    return next(new AppError('No player found with this id!', 404));
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
