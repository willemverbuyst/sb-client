const catchAsync = require('../../utils/catchAsync');
const { getScoresPlayer } = require('../../queries/predictionQuery');
const { getUserById } = require('../../queries/userQuery');
const AppError = require('../../utils/appError');

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;

  const { userName } = await getUserById(playerId);

  if (!userName) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  const scores = await getScoresPlayer(playerId);

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
