const {
  FIXTURES_PER_ROUND,
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_FIXTURES,
  NUMBER_OF_TOTO_ROUNDS,
} = require('../constants/set-up-game');

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

const reducer = (arr) => {
  const predictionsReduced = [];
  arr.reduce((a, b) => {
    if (!a[b.id]) {
      a[b.id] = { id: b.id, name: b.name, score: 0 };
      predictionsReduced.push(a[b.id]);
    }
    a[b.id].score += b.score;
    return a;
  }, {});
  return predictionsReduced;
};

module.exports = {
  chunkArray,
  chunkArrayTotoRounds,
  getTotoRoundNumber,
  reducer,
};
