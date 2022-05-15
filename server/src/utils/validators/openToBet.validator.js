module.exports = (currentTimeStamp, eventTimeStamp) =>
  currentTimeStamp < eventTimeStamp - 5 * 60;
