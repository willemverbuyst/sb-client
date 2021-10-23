const { userQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { deleteUserAndHisPredictionQuery } = userQueries;
const { isValidUUID } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const playerId = req.params.id;

  if (!isValidUUID(playerId)) {
    return next(new AppError('This is not a valid id!', 404));
  }

  const player = await deleteUserAndHisPredictionQuery(playerId);

  if (!player) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'Speler is verwijderd!',
  });
});
