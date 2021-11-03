const { predictionQueries } = require('../../../db/queries');
const { asyncHandler, errorHandlers, validators } = require('../../../utils');

const { catchAsync } = asyncHandler;
const {
  ErrorStatus422: { InvalidTotoRoundNumberError },
} = errorHandlers;
const { getScoresTotoRoundQuery } = predictionQueries;
const { isValidTotoRoundNumber } = validators;

module.exports = catchAsync(async (req, res, next) => {
  const totoRoundNumber = Number(req.params.id);

  if (!isValidTotoRoundNumber(totoRoundNumber)) {
    return next(new InvalidTotoRoundNumberError());
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
