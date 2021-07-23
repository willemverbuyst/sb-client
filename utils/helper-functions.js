const {
  FIXTURES_PER_ROUND,
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_FIXTURES,
  NUMBER_OF_TOTO_ROUNDS,
} = require('../constants/set-up-game');

const lastMonday = () => {
  const date = new Date();
  const day = date.getDay() || 7;
  if (day !== 1) return Math.floor(date / 1000) - 24 * (day - 1) * 60 * 60;
  return Math.floor(date / 1000);
};

const nextMonday = () => {
  return lastMonday() + 7 * 24 * 60 * 60;
};

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};

const chunkArrayTotoRounds = (arr) => {
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

const getTotoRoundNumber = (seasonNumber) =>
  seasonNumber > NUMBER_OF_TOTO_ROUNDS * ROUNDS_PER_TOTO_ROUND
    ? NUMBER_OF_TOTO_ROUNDS
    : Math.ceil(seasonNumber / ROUNDS_PER_TOTO_ROUND);

module.exports = {
  lastMonday,
  nextMonday,
  chunkArray,
  chunkArrayTotoRounds,
  getTotoRoundNumber,
};
