const { getLastMondayHelper } = require('./getLastMonday.helper');

module.exports = (now) => getLastMondayHelper(now) + 7 * 24 * 60 * 60;
