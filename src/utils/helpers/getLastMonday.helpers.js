const getTodayAsNumber = () => new Date().getDay() || 7;

// const getDays = (todayAsNumber) => (todayAsNumber - 1) * 24 * 60 * 60;

module.exports = () => {
  const date = new Date();
  const todayAsNumber = getTodayAsNumber();
  if (todayAsNumber !== 1)
    return Math.floor(date / 1000) - 24 * (todayAsNumber - 1) * 60 * 60;
  return Math.floor(date / 1000);
};
