const {
  roundsPerTotoRound,
  totalFixtures,
  totoRounds,
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

const chunkArrayRounds = (arr, sizeGroup) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, sizeGroup + index));
    index += sizeGroup;
  }
  return chunkedArr;
};

const chunkArrayTotoRounds = (arr, fixturesPerRound, roundsPerTotoRound) => {
  const groupedArr = chunkArrayRounds(arr, fixturesPerRound);
  const chunkedArr = [];
  let index = 0;

  while (index < groupedArr.length) {
    chunkedArr.push(groupedArr.slice(index, roundsPerTotoRound + index));
    index += roundsPerTotoRound;
  }

  if (
    arr.length > totalFixtures - fixturesPerRound &&
    chunkedArr[chunkedArr.length - 1].length < roundsPerTotoRound
  ) {
    chunkedArr[chunkedArr.length - 2] = [
      ...chunkedArr[chunkedArr.length - 2],
      ...chunkedArr[chunkedArr.length - 1],
    ];
    chunkedArr.pop();
  }

  return chunkedArr;
};

const chunkArrayGames = (arr, sizeGroup, sizeGame) => {
  const groupedArr = chunkArrayRounds(arr, sizeGroup);
  const chunkedArr = [];
  let index = 0;

  while (index < groupedArr.length) {
    chunkedArr.push(groupedArr.slice(index, sizeGame + index));
    index += sizeGame;
  }

  if (chunkedArr[chunkedArr.length - 1].length < sizeGame)
    chunkedArr[chunkedArr.length - 2] = [
      ...chunkedArr[chunkedArr.length - 2],
      ...chunkedArr[chunkedArr.length - 1],
    ];
  chunkedArr.pop();

  return chunkedArr;
};

const totoRoundNumber = (seasonNumber) =>
  seasonNumber > totoRounds * roundsPerTotoRound
    ? totoRounds
    : Math.ceil(seasonNumber / roundsPerTotoRound);

module.exports = {
  lastMonday,
  nextMonday,
  chunkArray,
  chunkArrayRounds,
  chunkArrayGames,
  chunkArrayTotoRounds,
  totoRoundNumber,
};
