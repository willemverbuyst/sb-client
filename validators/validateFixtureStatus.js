const validateFixtureStatus = (status) =>
  !!(status && status !== 'Match Finished');

module.exports = validateFixtureStatus;
