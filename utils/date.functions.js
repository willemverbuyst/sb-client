const lastMonday = () => {
  const date = new Date();
  const day = date.getDay() || 7;
  if (day !== 1) return Math.floor(date / 1000) - 24 * (day - 1) * 60 * 60;
  return Math.floor(date / 1000);
};

const nextMonday = () => lastMonday() + 7 * 24 * 60 * 60;

module.exports = {
  lastMonday,
  nextMonday,
};
