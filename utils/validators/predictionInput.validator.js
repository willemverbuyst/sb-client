const validatePredictionInput = (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId) =>
  !(
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId ||
    typeof fixtureId !== 'string'
  );

module.exports = validatePredictionInput;
