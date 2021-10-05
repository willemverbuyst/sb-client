const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { createNewUser } = require('../../queries/userQuery');
const validateSignupInput = require('../../validators/validateSignupInput');

module.exports = () =>
  catchAsync(async (req, res, next) => {
    const { userName, firstName, lastName, email, phoneNumber, teamId } =
      req.body;
    if (
      !validateSignupInput(
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

    const newPlayer = await createNewUser(req.body);

    res.status(201).json({
      status: 'success',
      data: { player: newPlayer },
      message: `Er is een nieuw account gemaakt voor ${newPlayer.dataValues.userName}.`,
    });
  });
