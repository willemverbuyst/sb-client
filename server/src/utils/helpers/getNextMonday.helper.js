const { getLastMondayHelper } = require('./getLastMonday.helpers');

module.exports = (now) => getLastMondayHelper(now) + 7 * 24 * 60 * 60;
