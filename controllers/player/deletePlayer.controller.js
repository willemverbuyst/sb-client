const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { deleteUserAndHisPrediction } = require('../../queries/userQuery');

module.exports = () =>
  catchAsync(async (req, res, next) => {
    const player = await deleteUserAndHisPrediction(req.params.id);

    if (!player) {
      return next(new AppError('Geen speler gevonden met deze id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Speler is verwijderd!',
    });
  });
