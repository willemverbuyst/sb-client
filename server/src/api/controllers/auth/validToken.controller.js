const jwt = require('jsonwebtoken');
const { fixtureQueries, userQueries } = require('../../../db/queries');
const { asyncHandler } = require('../../../utils');

const { catchAsync } = asyncHandler;
const { getCurrentRoundForUserQuery } = fixtureQueries;
const { getUserByEmailQuery } = userQueries;

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, _next) => {
  const user = await getUserByEmailQuery(req.user.email);

  delete user.dataValues.password;

  const currentRound = await getCurrentRoundForUserQuery(user.id);

  const token = signToken({ userId: user.email });

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        profile: user,
        currentRound,
      },
    },
    message: `Welcome back ${user.userName}`,
    token,
  });
});
