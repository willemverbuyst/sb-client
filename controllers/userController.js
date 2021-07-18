const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFixturesForLoggedInUser,
  getPastFixturesWithPredictionsAndScores,
} = require('../queries/fixtureQuery');
const {
  deleteUserAndHisPrediction,
  getAllUsers,
  getUserById,
  updateUserProfile,
} = require('../queries/userQuery');

const { validateProfileInput } = require('../validators/inputValidator');
const { validateUser } = require('../validators/queryValidator');

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await deleteUserAndHisPrediction(req.params.id);

  if (!validateUser(user)) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  res
    .status(204)
    .json({ status: 'success', data: null, message: 'Speler is verwijderd!' });
});

exports.getAllFixturesForLoggedInUser = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;

  const fixtures = await getAllFixturesForLoggedInUser(userId);

  res.status(200).json({
    status: 'success',
    result: fixtures.length,
    data: {
      fixtures,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await getAllUsers();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const users = await getUserById(req.params.id);

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

    if (!validateUser(user)) {
      return next(new AppError('Geen speler gevonden met deze id!', 404));
    }

    user.pastFixturesWithScores = await getPastFixturesWithPredictionsAndScores(
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

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const userId = Number(req.params.id);
  const loggedInUserId = Number(req.user.id);

  console.log(userId, '     ', loggedInUserId);

  if (userId !== loggedInUserId) {
    return next(new AppError('Je kan alleen je eigen profiel wijzigen!', 403));
  }

  if (!validateProfileInput(req.body)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const user = await updateUserProfile(loggedInUserId, req.body);

  // delete user.dataValues['password'];
  // const token = toJWT({ userId: user.id });

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
    message: 'Je profiel is gewijzigd.',
  });
});
