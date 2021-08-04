const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFixturesForLoggedInUser,
  getPastFixturesWithPredictionsAndScores,
} = require('../queries/fixtureQuery');
const { getUserById, updateUserProfile } = require('../queries/userQuery');
const validateUpdateProfileInput = require('../validators/validateUpdateProfileInput');

exports.getAllFixturesForLoggedInUser = catchAsync(async (req, res, _next) => {
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

exports.getUserWithPredictionsAndScoresPastFixtures = catchAsync(
  async (req, res, next) => {
    const user = await getUserById(req.params.id);

    if (!user) {
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
  const loggedInUserId = Number(req.user.id);
  const { userName, firstName, lastName, email, phoneNumber, teamId } =
    req.body;

  if (
    !validateUpdateProfileInput(
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      teamId,
    )
  ) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const profile = await updateUserProfile(loggedInUserId, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: { profile },
    },
    message: 'Je profiel is gewijzigd.',
  });
});
