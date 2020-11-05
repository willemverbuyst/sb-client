const scores = require('../constants/scores');

const calculateScore = (results, prediction) => {
  let currentScore = 0;

  const resultMatch = winner(results.homeTeam, results.awayTeam);
  const resultPrediction = winner(prediction.homeTeam, prediction.awayTeam);
  const guessedHome = results.homeTeam === prediction.homeTeam;
  const guessedAway = results.awayTeam === prediction.awayTeam;

  const FULL_SCORE = scores('fullScore');
  const GOAL_BONUS = scores('goalBonus');
  const TOTO_SCORE = scores('totoScore');

  if (resultMatch === resultPrediction) {
    currentScore = currentScore + TOTO_SCORE;
  }

  if (guessedHome) {
    currentScore = currentScore + GOAL_BONUS;
  }

  if (guessedAway) {
    currentScore = currentScore + GOAL_BONUS;
  }

  if (guessedHome && guessedAway) {
    currentScore = currentScore + FULL_SCORE;
  }

  return currentScore;
};

const winner = (homeTeam, awayTeam) =>
  homeTeam > awayTeam ? 'homeWins' : homeTeam < awayTeam ? 'awayWins' : 'draw';

module.exports = calculateScore;
