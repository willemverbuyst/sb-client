module.exports = (arr) => {
  const predictionsReduced = [];
  arr.reduce((a, b) => {
    if (!a[b.userId]) {
      a[b.userId] = { userId: b.userId, name: b.name, score: 0 };
      predictionsReduced.push(a[b.userId]);
    }
    a[b.userId].score += b.score;
    return a;
  }, {});
  return predictionsReduced;
};
