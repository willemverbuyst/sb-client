const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Team = require('../models').team;
const User = require('../models').user;

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Vul email en wachtwoord in!'), 400);
  }

  const user = await User.findOne({
    where: { email },
    include: [{ model: Team, attributes: ['id', 'logo', 'name'] }],
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(
      new AppError(
        'Speler met dit emailadres en wachtwoord niet gevonden, probeer opnieuw!',
        401,
      ),
    );
  }

  const token = 123123123;
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
    token,
  });
});
