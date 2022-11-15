const scores = require('../../constants/scores');
const getWinner = require('./getWinner.function');

module.exports = (
  goalsHomeTeam,
  goalsAwayTeam,
  predictionHomeTeam,
  predictionAwayTeam,
) => {
  // Check if there are values, if not return with a score of zero
  if (
    goalsHomeTeam == null ||
    goalsAwayTeam == null ||
    predictionHomeTeam == null ||
    predictionAwayTeam == null
  ) {
    return 0;
  }

  // If all values are there, continue
  let score = 0;

  const winnerMatch = getWinner(goalsHomeTeam, goalsAwayTeam);
  const winnerPrediction = getWinner(predictionHomeTeam, predictionAwayTeam);

  if (winnerMatch === winnerPrediction) {
    score += scores.TOTO_SCORE;
  }

  if (goalsHomeTeam === predictionHomeTeam) {
    score += scores.GOAL_BONUS;
  }

  if (goalsAwayTeam === predictionAwayTeam) {
    score += scores.GOAL_BONUS;
  }

  if (
    goalsHomeTeam === predictionHomeTeam &&
    goalsAwayTeam === predictionAwayTeam
  ) {
    score += scores.FULL_SCORE;
  }

  return score;
};
