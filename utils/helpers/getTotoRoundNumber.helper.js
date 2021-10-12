const {
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_TOTO_ROUNDS,
} = require('../../constants/set-up-game');

module.exports = (seasonNumber) =>
  seasonNumber > NUMBER_OF_TOTO_ROUNDS * ROUNDS_PER_TOTO_ROUND
    ? NUMBER_OF_TOTO_ROUNDS
    : Math.ceil(seasonNumber / ROUNDS_PER_TOTO_ROUND);
