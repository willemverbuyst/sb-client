const { NUMBER_OF_TOTO_ROUNDS } = require('../../constants/set-up-game');

module.exports = (totoRoundNumber) =>
  typeof totoRoundNumber === 'number' &&
  totoRoundNumber > 0 &&
  totoRoundNumber <= NUMBER_OF_TOTO_ROUNDS;
