const { predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { AppError } = errorHandlers;
const { getScoresTotoRoundQuery } = predictionQueries;
const { isValidTotoRoundNumber } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const totoRoundNumber = Number(req.params.id);

  if (!isValidTotoRoundNumber(totoRoundNumber)) {
    return next(new AppError('This is not a valid totoround number!', 422));
  }

  const scores = await getScoresTotoRoundQuery(totoRoundNumber);

  res.status(200).json({
    status: 'success',
    results: scores.length,
    data: {
      scores,
      totoRoundNumber,
    },
  });
});
