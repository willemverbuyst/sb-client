const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  deleteUserAndHisPrediction,
  getUserById,
  getUsers,
} = require('../queries/userQuery');
const {
  getPredictionsAndScoresPastFixtures,
} = require('../queries/predictionQuery');

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await deleteUserAndHisPrediction(req.params.id);
  console.log('user ', user);

  if (user !== 1) {
    next(new AppError('Geen speler gevonden met deze id!', 404));
    return;
  }

  res
    .status(204)
    .json({ status: 'success', data: null, message: 'Speler is verwijderd!' });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await getUsers();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserWithPredictionsAndScoresPastFixtures = catchAsync(
  async (req, res, next) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      next(new AppError('Geen speler gevonden met deze id!', 404));
      return;
    }

    user.pastFixturesWithScores = await getPredictionsAndScoresPastFixtures(
      user.id,
    );

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  },
);
