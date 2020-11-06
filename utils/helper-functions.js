const lastMonday = () => {
  const date = new Date();
  const day = date.getDay() || 7;
  if (day !== 1) return Math.floor(date / 1000) - 24 * (day - 1) * 60 * 60;
  return Math.floor(date / 1000);
};

const chunkArray = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

module.exports = { lastMonday, chunkArray };
