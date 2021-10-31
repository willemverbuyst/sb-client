const { predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { InvalidRoundNumberError } = errorHandlers;
const { getScoresRoundQuery } = predictionQueries;
const { isValidRoundNumber } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const roundNumber = Number(req.params.id);

  if (!isValidRoundNumber(roundNumber)) {
    return next(new InvalidRoundNumberError());
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
