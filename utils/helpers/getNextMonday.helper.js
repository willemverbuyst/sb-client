const getLastMonday = require('./getLastMonday.helpers');

module.exports = () => getLastMonday() + 7 * 24 * 60 * 60;
