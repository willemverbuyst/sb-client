module.exports = (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId) =>
  !(
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId ||
    typeof fixtureId !== 'string'
  );
