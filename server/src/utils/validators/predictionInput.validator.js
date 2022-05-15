module.exports = (pGoalsHomeTeam, pGoalsAwayTeam) =>
  !(typeof pGoalsHomeTeam !== 'number' || typeof pGoalsAwayTeam !== 'number') &&
  pGoalsHomeTeam >= 0 &&
  pGoalsAwayTeam >= 0;
