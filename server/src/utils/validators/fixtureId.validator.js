module.exports = (fixtureId) =>
  typeof fixtureId !== 'boolean' && +fixtureId > 0;
