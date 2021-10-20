const { NUMBER_OF_ROUNDS } = require('../../constants/set-up-game');

module.exports = (roundNumber) =>
  roundNumber > 0 && roundNumber <= NUMBER_OF_ROUNDS;
