const reducer = (arr) => {
  let predictionsReduced = [];
  arr.reduce((a, b) => {
    if (!a[b.userId]) {
      a[b.userId] = { userId: b.userId, user: b.user, score: 0 };
      predictionsReduced.push(a[b.userId]);
    }
    a[b.userId].score += b.score;
    return a;
  }, {});
  return predictionsReduced;
};

module.exports = reducer;
