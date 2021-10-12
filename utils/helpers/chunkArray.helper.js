module.exports = (arr, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
};
