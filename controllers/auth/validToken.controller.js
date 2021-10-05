const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');
const { getUserByEmail } = require('../../queries/userQuery');
const { getCurrentRoundForUser } = require('../../queries/fixtureQuery');

const signToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });

module.exports = catchAsync(async (req, res, _next) => {
  const user = await getUserByEmail(req.user.email);

  const currentRound = await getCurrentRoundForUser(user.id);

  const token = signToken({ userId: user.email });
  user.password = '';

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
