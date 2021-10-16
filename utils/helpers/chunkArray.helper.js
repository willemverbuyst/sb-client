module.exports = (arr, size) => {
  const chunkedArray = [];
  let index = 0;
  if (arr && arr.length > 0 && size) {
    while (index < arr.length) {
      chunkedArray.push(arr.slice(index, size + index));
      index += size;
    }
  }
  return chunkedArray;
};
