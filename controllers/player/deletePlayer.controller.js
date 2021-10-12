const { errorHandlers } = require('../../utils');
const catchAsync = require('../../utils/catchAsync');
const { userQueries } = require('../../queries');

const { AppError } = errorHandlers;
const { deleteUserAndHisPredictionQuery } = userQueries;

module.exports = catchAsync(async (req, res, next) => {
  const player = await deleteUserAndHisPredictionQuery(req.params.id);

  if (!player) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
    message: 'Speler is verwijderd!',
  });
});
