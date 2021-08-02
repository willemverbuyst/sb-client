const validatePredictionInput = (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId) =>
  !!pGoalsHomeTeam &&
  !!pGoalsAwayTeam &&
  !!fixtureId &&
  typeof pGoalsHomeTeam === 'number' &&
  typeof pGoalsAwayTeam === 'number';

module.exports = validatePredictionInput;
