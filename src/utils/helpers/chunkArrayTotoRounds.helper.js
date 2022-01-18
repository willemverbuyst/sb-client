const {
  FIXTURES_PER_ROUND,
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_FIXTURES,
} = require('../../constants/set-up-game');
const chunkArray = require('./chunkArray.helper');

module.exports = (arr) => {
  const groupedArr = chunkArray(arr, FIXTURES_PER_ROUND);
  const chunkedArr = [];
  let index = 0;

  while (index < groupedArr.length) {
    chunkedArr.push(groupedArr.slice(index, ROUNDS_PER_TOTO_ROUND + index));
    index += ROUNDS_PER_TOTO_ROUND;
  }

  if (
    arr.length > NUMBER_OF_FIXTURES - FIXTURES_PER_ROUND &&
    chunkedArr[chunkedArr.length - 1].length < ROUNDS_PER_TOTO_ROUND
  ) {
    chunkedArr[chunkedArr.length - 2] = [
      ...chunkedArr[chunkedArr.length - 2],
      ...chunkedArr[chunkedArr.length - 1],
    ];
    chunkedArr.pop();
  }

  return chunkedArr;
};
