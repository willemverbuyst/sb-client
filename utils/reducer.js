const reducer = (arr) => {
  let predictionsReduced = [];
  arr.reduce((a, b) => {
    if (!a[b.id]) {
      a[b.id] = { id: b.id, user: b.user, score: 0 };
      predictionsReduced.push(a[b.id]);
    }
    a[b.id].score += b.score;
    return a;
  }, {});
  return predictionsReduced;
};

module.exports = reducer;
