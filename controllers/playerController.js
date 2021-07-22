const jwt = require('jsonwebtoken');
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
const { validateUser } = require('../validators/queryValidator');

exports.deletePlayer = catchAsync(async (req, res, next) => {
  const player = await deleteUserAndHisPrediction(req.params.id);

  if (!validateUser(player)) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  res
    .status(204)
    .json({ status: 'success', data: null, message: 'Speler is verwijderd!' });
});

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await getAllUsers();

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: {
      players,
    },
  });
});
