const catchAsync = require('../utils/catchAsync');
const { getScoresTotalToto } = require('../queries/predictionQuery');

exports.getScoresTotalToto = catchAsync(async (req, res, next) => {
  const scoresTotalToto = await getScoresTotalToto();

  res.status(200).json({
    status: 'success',
    results: scoresTotalToto.length,
    data: {
      scoresTotalToto,
    },
  });
});
