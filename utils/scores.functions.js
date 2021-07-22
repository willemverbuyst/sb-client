const scores = require('../constants/scores');

const addScoresTofixturesWithPrediction = (fixturesWithPrediction) =>
  fixturesWithPrediction.map((fixtureWithPrediction) => {
    return {
      ...fixtureWithPrediction,
      score: calculateScore(
        {
          homeTeam: fixtureWithPrediction.goalsHomeTeam,
          awayTeam: fixtureWithPrediction.goalsAwayTeam,
        },
        {
          homeTeam: fixtureWithPrediction.predictions.pGoalsHomeTeam,
          awayTeam: fixtureWithPrediction.predictions.pGoalsAwayTeam,
        },
      ),
    };
  });

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

const calculateScores = (
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
    score = score + scores.TOTO_SCORE;
  }

  const guessedHome = goalsHomeTeam === predictionHomeTeam;
  const guessedAway = goalsAwayTeam === predictionAwayTeam;

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

const getWinner = (homeTeam, awayTeam) =>
  homeTeam > awayTeam ? 'homeWins' : homeTeam < awayTeam ? 'awayWins' : 'draw';

module.exports = {
  addScoresTofixturesWithPrediction,
  calculateScore,
  calculateScores,
};
