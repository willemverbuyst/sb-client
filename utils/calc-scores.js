const scores = require('../constants/scores');

const getWinner = (homeTeam, awayTeam) =>
  homeTeam > awayTeam ? 'homeWins' : homeTeam < awayTeam ? 'awayWins' : 'draw';

const calculateScore = (results, prediction) => {
  // Check if there are values, if not return with a score of zero
  if (
    results.homeTeam == null ||
    results.awayTeam == null ||
    prediction.homeTeam == null ||
    prediction.awayTeam == null
  ) {
    return 0;
  }

  // If all values are there, continue
  let score = 0;

  const winnerMatch = getWinner(results.homeTeam, results.awayTeam);
  const winnerPrediction = getWinner(prediction.homeTeam, prediction.awayTeam);

  if (winnerMatch === winnerPrediction) {
    score = score + scores.TOTO_SCORE;
  }

  const guessedHome = results.homeTeam === prediction.homeTeam;
  const guessedAway = results.awayTeam === prediction.awayTeam;

  if (guessedHome) {
    score = score + scores.GOAL_BONUS;
  }

  if (guessedAway) {
    score = score + scores.GOAL_BONUS;
  }

  if (guessedHome && guessedAway) {
    score = score + scores.FULL_SCORE;
  }

  return score;
};

module.exports = calculateScore;
