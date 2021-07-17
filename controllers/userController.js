const catchAsync = require('../utils/catchAsync');
const { getUsers } = require('../queries/userQuery');

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
