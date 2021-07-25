const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  createNewUser,
  deleteUserAndHisPrediction,
  getAllUsers,
} = require('../queries/userQuery');
const { validateSignupInput } = require('../validators/inputValidator');
const { validateUser } = require('../validators/queryValidator');

exports.deletePlayer = catchAsync(async (req, res, next) => {
  const player = await deleteUserAndHisPrediction(req.params.id);

  if (!validateUser(player)) {
    return next(new AppError('Geen speler gevonden met deze id!', 404));
  }

  res
    .status(200)
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

exports.signupPlayer = catchAsync(async (req, res, next) => {
  if (!validateSignupInput(req.body)) {
    return next(new AppError('Details ontbreken, probeer opnieuw!', 404));
  }

  const newPlayer = await createNewUser(req.body);

  res.status(201).json({
    status: 'success',
    data: { player: newPlayer },
    message: `Er is een nieuw account gemaakt voor ${newPlayer.dataValues.userName}.`,
  });
});
