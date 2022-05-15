const getNowAsTimeStamp = (now) => Math.floor(now / 1000);

const getTodayAsNumber = (now) => now.getDay() || 7;

const getLastMondayAsTimeStamp = (now) =>
  getNowAsTimeStamp(now) - 24 * (getTodayAsNumber(now) - 1) * 60 * 60;

const isTodayAMonday = (now) => getTodayAsNumber(now) === 1;

const getLastMondayHelper = (now) =>
  isTodayAMonday(now) ? getNowAsTimeStamp(now) : getLastMondayAsTimeStamp(now);

module.exports = {
  getLastMondayAsTimeStamp,
  getLastMondayHelper,
  getNowAsTimeStamp,
  getTodayAsNumber,
  isTodayAMonday,
};
