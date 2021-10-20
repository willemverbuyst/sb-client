const { predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getScoresRoundQuery } = predictionQueries;
const { isValidRoundNumber } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const roundNumber = req.params.id;

  if (!isValidRoundNumber(roundNumber)) {
    return next(new AppError('This is not a valid round number!', 404));
  }

  const scores = await getScoresRoundQuery(roundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      roundNumber,
    },
  });
});
